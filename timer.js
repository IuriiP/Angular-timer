angular.module('timerApp', [])
    .controller('timerCtrl', ['$scope', '$timeout', '$rootScope',
        function ($scope, $timeout, $rootScope) {
            $scope.timeoutId = $scope.timeoutId || false;
            $scope.timers = $scope.timers || {};

            function updateTimers() {
                $scope.timeoutId = $timeout(updateTimers, 1000);
                for (var id in $scope.timers) {
                    if ($scope.timers[id]) {
                        var timer = updateTimer(id);
                        // console.log(timer.counter);
                        if (timer.counter <= 0) {
                            $scope.timers[id] = false;
                            if (timer.onZero) {
                                // console.log('eval ' + timer.onZero);
                                $scope.$eval(timer.onZero);
                            }
                        }
                    }
                }
            }

            function updateTimer(id) {
                $rootScope[id].counter = $rootScope[id].counter + $rootScope[id].increment;

                return formatTimer(id);
            }

            function formatTimer(id) {
                if ($rootScope[id].increment > 0) {
                    var d = new Date($rootScope[id].counter * 1000),
                    mon = '0' + (d.getMonth() + 1),
                    day = '0' + d.getDate(),
                    days = Math.floor($rootScope[id].counter / 60 / 60 / 24),
                    hrs = '0' + d.getHours(),
                    min = '0' + d.getMinutes(),
                    sec = '0' + d.getSeconds();

                    $rootScope[id].fulldate = d.toString();
                    $rootScope[id].year = d.getFullYear();
                    $rootScope[id].week = d.getDay();

                } else {
                    var cnt = $rootScope[id].counter;
                    $rootScope[id].fulldate = Date().toString();
                    $rootScope[id].year = '0';
                    $rootScope[id].week = '0';
                    mon = '00';
                    day = '00';
                    days = Math.floor(cnt / 60 / 60 / 24);
                    cnt = cnt - days*60*60*24;
                    hrs = '0' + Math.floor(cnt/60/60);
                    cnt = cnt - hrs*60*60;
                    min = '0' + Math.floor(cnt/60);
                    cnt = cnt - min*60;
                    sec = '0' + cnt;
                }

                    $rootScope[id].month = mon.substr(-2);
                    $rootScope[id].day = day.substr(-2);
                    $rootScope[id].days = days;
                    $rootScope[id].hours = hrs.substr(-2);
                    $rootScope[id].minutes = min.substr(-2);
                    $rootScope[id].seconds = sec.substr(-2);
                return $rootScope[id];
            }

            $scope.startTimer = function (id) {
                formatTimer(id);

                $scope.timers[id] = true;
                if (!$scope.timeoutId)
                    $scope.timeoutId = $timeout(updateTimers, 1000);
            };
            
            $scope.destroyTimer = function(id) {
                delete $scope.timers[id];
            }

        }
    ])
    .directive('timer', ['$rootScope',
        function ($rootScope) {
            function link($scope, element, attrs) {

                var datte = new Date();
                var id = attrs.id || 'timer';
                var counter = parseInt(attrs.value, 10) || Math.round(datte.getTime() / 1000);
                var increment = 1;

                if (typeof attrs.countdown !== 'undefined') {
                    increment = -1;
                }

                $rootScope[id] = {
                    counter: counter,
                    increment: increment,
                    onZero: attrs.onzero
                };

                $scope.startTimer(id);

                $rootScope.$watch(id + '.timetolive', function (newValue) {
//                    console.log(id + '.newtime = ' + newValue);
                    if (newValue) {
                        $rootScope[id].counter = parseInt(newValue, 10);
                        $scope.startTimer(id);
                    }
                });
                
                element.on('$destroy', function() {
                    $scope.destroyTimer(id);
                });

            }

            return {
                restrict: 'EC',
                controller: 'timerCtrl',
                link: link
            };
        }
    ])
    ;
