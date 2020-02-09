import { ID } from '../../../fields/ID';
import { Text } from '../../../fields/Text';
import { BaseResource } from '../../../Resource';
import { HasMany } from '../../../fields/HasMany';
export declare class Role extends BaseResource {
    displayValue(): string;
    fields(): (ID | Text | HasMany)[];
    collection(): string;
    permissions(): string[];
    availableForNavigation(): boolean;
}
