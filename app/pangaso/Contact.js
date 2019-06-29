const {
    ID,
    Text,
    Resource,
    HasOne,
    File,
    Num,
    Select,
    Password,
    Textarea,
    HasOneEmbedded
} = require(process.env.CI_ENVIRONMENT ? '../dist/server/main' : 'pangaso')

const ContactRole = require('./Filters/ContactRole')
const SendWelcomeEmailAction = require('./Actions/SendWelcomeEmail')

const Bcrypt = require('bcryptjs')

class Contact extends Resource {
    displayValue() {
        return 'firstName'
    }

    filters() {
        return [new ContactRole()]
    }

    fields() {
        return [
            ID.make('ID'),
            Num.make('Age').hideOnIndex(),
            Select.make('Role')
                .withOptions([
                    {
                        label: 'Administrator',
                        value: 'admin'
                    },
                    {
                        label: 'Manager',
                        value: 'manager'
                    },
                    {
                        label: 'Super Administrator',
                        value: 'super-admin'
                    }
                ])
                .hideOnIndex(),
            Text.make('First Name')
                .createWithRules('required|max:40')
                .searchable()
                .hideOnIndex(),
            Text.make('Full Name').computedWith(
                document => `${document.firstName} ${document.lastName}`
            ),
            Text.make('Last Name')
                .createWithRules('required|max:40')
                .searchable()
                .hideOnIndex(),
            Text.make('Email')
                .createWithRules('required|email')
                .searchable(),
            Password.make('Password'),
            Text.make('Phone')
                .createWithRules('required')
                .searchable(),
            Textarea.make('Bio')
                .createWithRules('required')
                .searchable()
                .alwaysShow()
                .rows(4),
            HasOneEmbedded.make('Address').withFields([
                Text.make('City').createWithRules('required'),
                Text.make('State').createWithRules('required'),
                Text.make('Postal Code').createWithRules('required')
            ]),
            File.make('Avatar').hideOnIndex(),
            HasOne.make('Organisation').searchable()
        ]
    }

    actions() {
        return [new SendWelcomeEmailAction()]
    }

    async beforeSave(data) {
        return {
            ...data,
            password: data.password ? Bcrypt.hashSync(data.password) : null
        }
    }

    async beforeUpdate(data) {
        if (data.password) {
            return {
                ...data,
                password: Bcrypt.hashSync(data.password)
            }
        }

        return data
    }
}

module.exports = Contact
