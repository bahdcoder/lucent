import { ID } from '../../../fields/ID';
import { Text } from '../../../fields/Text';
import { BaseResource } from '../../../Resource';
import { Textarea } from '../../../fields/Textarea';
export declare class Permission extends BaseResource {
    displayValue(): string;
    fields(): (ID | Text | Textarea)[];
    collection(): string;
    availableForNavigation(): boolean;
}
