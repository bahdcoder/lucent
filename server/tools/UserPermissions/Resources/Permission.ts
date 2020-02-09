import { ID } from '../../../fields/ID'
import { Text } from '../../../fields/Text'
import { BaseResource } from '../../../Resource'
import { Textarea } from '../../../fields/Textarea'

export class Permission extends BaseResource {
    public displayValue() {
        return 'slug'
    }

    public fields() {
        return [
            ID.make('ID'),
            Text.make('Slug').searchable().createWithRules('required'),
            Textarea.make('Description'),
        ]
    }

    public collection(): string {
        return `lucent-${super.collection()}`
    }

    public availableForNavigation() {
        return false
    }
}
