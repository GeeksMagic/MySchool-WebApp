
    'use strict';
    geeksApp.controller('DemoProgressController', DemoProgressController);

    DemoProgressController.$inject = ['$interval'];

    function DemoProgressController($interval)
    {
        var vm = this;

        vm.toggleIndeterminateCircularProgress = toggleIndeterminateCircularProgress;

        vm.showIndeterminateCircularProgress = false;

        function toggleIndeterminateCircularProgress()
        {
            vm.showIndeterminateCircularProgress = !vm.showIndeterminateCircularProgress;
        }
    }


    
