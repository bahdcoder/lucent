import * as Bcrypt from 'bcryptjs'
import { ID } from '../../../fields/ID'
import { Text } from '../../../fields/Text'
import { BaseResource } from '../../../Resource'
import { Password } from '../../../fields/Password'
import { HasOne } from '../../../fields/HasOne'
import { Boolean } from '../../../fields/Boolean'

export class User extends BaseResource {
    public displayValue() {
        return 'name'
    }

    public fields() {
        return [
            ID.make('ID'),
            Text.make('Name').createWithRules('required').searchable(),
            Text.make('Email', 'email').createWithRules('required').searchable(),
            Password.make('Password').createWithRules('required|min:8').hideWhenUpdating(),
            HasOne.make('Role').createWithRules('required'),
            Boolean.make('Active', 'activated')
        ]
    }

    public authorizedToCreate() {
        return false
    }

    public collection(): string {
        return `lucent-${super.collection()}`
    }

    public availableForNavigation() {
        return false
    }

    public permissions() {
        return [
            'create-user',
            'read-user',
            'update-user',
            'delete-user',
            'change-user-status'
        ]
    }

    public async beforeInsert(data: any) {
        return {
            ...data,
            password: data.password ? Bcrypt.hashSync(data.password) : data.password
        }
    }
}
