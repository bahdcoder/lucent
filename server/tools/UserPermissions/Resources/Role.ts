import { ID } from '../../../fields/ID'
import { Text } from '../../../fields/Text'
import { BaseResource } from '../../../Resource'
import { HasMany } from '../../../fields/HasMany'

export class Role extends BaseResource {
    public displayValue() {
        return 'name'
    }

    public fields() {
        return [
            ID.make('ID'),
            Text.make('Name').createWithRules('required'),
            HasMany.make('Permissions').createWithRules('required')
        ]
    }

    public collection(): string {
        return `lucent-${super.collection()}`
    }

    public permissions() {
        return [
            'create-role',
            'read-role',
            'update-role',
            'delete-role'
        ]
    }

    public availableForNavigation() {
        return false
    }
}
