setTimeout(function() {

    PTM.stateManager = Ember.StateManager.create({
        rootElement: '#mainArea',
        initialState: 'showPhotoView',

        showPhotoView: Ember.ViewState.create({
            enter: function(stateManager) {
                this._super(stateManager);
                PTM.PhotoListController.set('content', PTM.store.findAll(PTM.Photo));
            },

            view: Em.ContainerView.create({
                childViews: ['photoListView', 'controlButtoniew', 'selectedPhotoView'],

                photoListView: Em.View.extend({
                    elementId: "thumbnailViewList",
                    templateName: 'photo-view-list',
                    contentBinding: 'PTM.PhotoListController.content'
                }),

                selectedPhotoView: Em.View.extend({
                    templateName: 'selected-photo',
                    contentBinding: 'PTM.SelectedPhotoController.content',
                    classNames: ['selectedPhoto']
                }),

                controlButtoniew: Em.View.extend({
                    templateName: 'control-button-view',
                    classNames: 'controlButtons'
                })
            })
        })
    });

}, 50);

setTimeout(function() {
    PTM.routes = Em.Object.create({
        gotoRoute: function(routeParams) {
            if(routeParams.type === 'photo' && routeParams.id) {
                PTM.PhotoListController.selectPhotoWithId(routeParams.id);
                document.title = 'PTM - ' + routeParams.id;
                PTM.stateManager.goToState('showPhotoView');
            }
        }
    });

    SC.routes.add(":type/:id", PTM.routes, 'gotoRoute');
    SC.routes.add(":type", PTM.routes, 'gotoRoute');
}, 250)
