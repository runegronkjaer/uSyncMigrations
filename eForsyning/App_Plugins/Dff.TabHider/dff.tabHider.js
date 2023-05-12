/**
* @ngdoc directive
* @name umbraco.directives.directive:valTab
* @restrict A
* @description Used to show validation warnings for a tab to indicate that the tab content has validations errors in its data.
* In order for this directive to work, the valFormManager directive must be placed on the containing form.
**/

function valTab(userService) {
    return {
        require: ['^form', '^valFormManager'],
        restrict: "A",
        link: function (scope, element, attr, ctrs) {

            var valFormManager = ctrs[1];
            var tabId = "tab" + scope.tab.id;                        
            scope.tabHasError = false;

            // Kode til at skjule faner er flyttet til server-side 'HideTabsApplicationEventHandler' af to årsager:
            // - Det er mere sikkert at køre koden server-side
            // - Den gamle Javascript-kode havde problemer med at skjule første fane. Selve fanen blev skjult men ikke indholdet.

            //listen for form validation changes
            valFormManager.onValidationStatusChanged(function (evt, args) {
                if (!args.form.$valid) {
                    var tabContent = element.closest(".umb-panel").find("#" + tabId);
                    //check if the validation messages are contained inside of this tabs 
                    if (tabContent.find(".ng-invalid").length > 0) {
                        scope.tabHasError = true;
                    } else {
                        scope.tabHasError = false;
                    }
                }
                else {
                    scope.tabHasError = false;
                }
            });

        }
    };
}

angular.module('umbraco.directives.validation').directive("valTab", valTab);