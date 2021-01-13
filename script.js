require(["esri/WebMap", 
               "esri/views/MapView",
               "esri/widgets/LayerList",
               "esri/layers/Layer",
               "esri/widgets/Editor",], 
              function (WebMap, MapView, LayerList, Layer, Editor) {

        var webmap = new WebMap({
          portalItem: {
            id: "b58b88d20bcb4fa3a6aa1ca3728dde7c"
          },
        });

        const editThisAction = {
          title: "Editar",
          id: "edit-this",
          className: "esri-icon-edit"
        };

        var view = new MapView({
          container: "viewDiv",
          map: webmap

        });

        var editor = new Editor({
            view: view
          });

        view.popup.actions.push(editThisAction);

        function editThis() {
            if (!editor.viewModel.activeWorkFlow) {
              view.popup.visible = false;

              editor.startUpdateWorkflowAtFeatureEdit(
                view.popup.selectedFeature
              );
              view.ui.add(editor, "bottom-right");
              view.popup.spinnerEnabled = false;
            }

            setTimeout(function () {
              let arrComp = editor.domNode.getElementsByClassName(
                "esri-editor__back-button esri-interactive"
              );
              if (arrComp.length === 1) {
                arrComp[0].setAttribute(
                  "title",
                  "Cancel edits, return to popup"
                );
                arrComp[0].addEventListener("click", function (evt) {
                  evt.preventDefault();
                  view.ui.remove(editor);
                  view.popup.open({
                    features: features
                  });
                });
              }
            }, 150);
          }

        view.when(function () {
          var layerList = new LayerList({
            view: view
          });

          view.ui.add(layerList, "top-right");
        });

        view.popup.on("trigger-action", function (event) {
            if (event.action.id === "edit-this") {
              editThis();
            }
          });
      });