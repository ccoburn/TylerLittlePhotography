angular.module('app')

.directive('fileread', function (mediaService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {
          debugger;
          var fileread = loadEvent.target.result;
          // console.warn(fileread);


          var tempArray = elem[0].value.split('\\');

          var fileName = tempArray[tempArray.length - 1];
          var type = scope.type;
          var clientId = null;
          var sampleId = null;
            if (scope.client) {
              clientId = scope.client.id;
            }
            if (scope.sample) {
              sampleId = scope.sample.id;
            }
          

          console.log(type, clientId, sampleId);

          mediaService.storeImage(fileread, fileName, type, clientId, sampleId)
          .then(function (result) {
            scope.images.unshift(result.data);
          })
          .catch(function (err) {
            console.error(err);
          });
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
})
