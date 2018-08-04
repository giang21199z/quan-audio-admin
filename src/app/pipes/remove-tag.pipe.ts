import { Pipe } from "@angular/core";

@Pipe({
    name: 'removeTag'
})
export class RemoveTagPipe{
    transform(value: string): string {
        return value.replace(/<(.|\n)*?>/g, '');
    }
}