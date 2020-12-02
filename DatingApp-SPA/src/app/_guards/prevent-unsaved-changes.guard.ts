import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { from } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>{
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm("Are you sure you want to continur? Any unsavd change will  be lost");
        }
        return true;

    }
}