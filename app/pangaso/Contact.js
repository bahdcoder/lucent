const {
    ID,
    Text,
    Resource,
    HasOne,
    HasOneEmbedded
} = require('../../dist/server/main')

class Contact extends Resource {
    displayValue() {
        return 'firstName'
    }

    fields() {
        return [
            ID.make('ID'),
            Text.make('First Name')
                .createWithRules('required|max:40')
                .searchable(),
            Text.make('Last Name')
                .createWithRules('required|max:40')
                .searchable(),
            Text.make('Email')
                .createWithRules('required|email')
                .searchable(),
            Text.make('Phone')
                .createWithRules('required')
                .searchable(),
            HasOneEmbedded.make('Address').withFields([
                Text.make('City').createWithRules('required'),
                Text.make('State').createWithRules('required'),
                Text.make('Postal Code').createWithRules('required')
            ]),
            HasOne.make('Organisation').searchable()
        ]
    }
}

module.exports = Contact
