import { ID } from '../../../fields/ID';
import { Text } from '../../../fields/Text';
import { BaseResource } from '../../../Resource';
import { Password } from '../../../fields/Password';
import { HasOne } from '../../../fields/HasOne';
import { Boolean } from '../../../fields/Boolean';
export declare class User extends BaseResource {
    displayValue(): string;
    fields(): (ID | Text | Password | HasOne | Boolean)[];
    authorizedToCreate(): boolean;
    collection(): string;
    availableForNavigation(): boolean;
    permissions(): string[];
    beforeInsert(data: any): Promise<any>;
}
