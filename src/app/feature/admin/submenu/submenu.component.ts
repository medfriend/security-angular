import {Component, OnDestroy, OnInit} from "@angular/core";
import {sharedModules} from "../../../shared/shared.module";
import {BasicAutocompleteComponent} from "../../../components/autocompletes/basic-autocomplete.component";
import {BasicHeaderComponent} from "../../../components/header/basic-header/basic-header.component";
import {BasicButtonComponent} from "../../../components/buttons/basic-button/basic-button.component";
import {Menu, MenuColumns} from "../../../core/interfaces/components/menu/menu.interface";
import {ActionTableComponent} from "../../../components/table/action-table/action-table.component";
import {MasterTableComponent} from "../../../components/table/master-table/master-table.component";
import {SubMenuActions} from "../../../core/interfaces/components/submenu/submenu.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {MenuService} from "../../../core/service/menu.service";

@Component({
    selector: "app-admin-submenu",
    templateUrl: "./submenu.component.html",
    styleUrls: ["./submenu.component.scss"],
    standalone: true,
    imports: [
        sharedModules,
        BasicAutocompleteComponent,
        BasicHeaderComponent,
        BasicButtonComponent,
        ActionTableComponent,
        MasterTableComponent
    ]
})
export class SubMenuAdminComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<void>();
    overflow: boolean | undefined = false
    idKey= 'MenuID';
    dataSource: Menu[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private menuService: MenuService,
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.queryParamMap.get('menu');

        if(id){
            this.GetChilds(id)
        }

    }

    GetChilds(id: string){
        this.menuService.getChildByParentId(id)
            .subscribe(childs => {
                this.dataSource = childs;
            })
    }

    navegateCreate(){

    }

    handleOverflow(isOverflowing: boolean | undefined): void {
        this.overflow = isOverflowing;
    }


    columns = MenuColumns;
    menuActions = SubMenuActions;

    actionHandler(event: any, row:any){
        this.router.navigate(
            [`/home/${event}`],
            { queryParams: { menu: row.MenuID } }
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}