module App.Services {

    export interface IWidget {
        sizeX: number;
        sizeY: number;
        colX: number;
        colY: number;
        title: string;
        dashboardId: number;
    }

    export interface IDashboard {
        id: number;
        name: string;
        widgets: Array<IWidget>;
    }

    export interface IDashboardDataService {
        getDashboards(): ng.IPromise<Array<IDashboard>>;
    }

    class DashboardDataService implements IDashboardDataService {
        static $inject: Array<string> = ["$http"];

        constructor( private $http: ng.IHttpService ) {}

        getDashboards(): ng.IPromise<Array<IDashboard>> {
            return this.$http.get( "api/dashboard", {
                    headers: {
                        ContentType: "application/json"
                    }
                } )
                .then( ( data ) => {
                    return data.data;
                } );
        }
    }

    angular
        .module( "app.services" )
        .service( "app.services.dashboardService", DashboardDataService );
}