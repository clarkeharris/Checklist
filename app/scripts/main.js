
Checklist = Backbone.Model.extend({
 
  initialize: function() {
    this.on('change', function(){
    })
  },
 
  idAttribute: '_id'
});
// Collection
ChecklistCollection = Backbone.Collection.extend({
 
  model: Checklist,
 
  url: 'http://tiny-pizza-server.herokuapp.com/collections/ch-todo',
})

// AddCheckList View

AddChecklistView = Backbone.View.extend({
	
	template: _.template($('.checklist-item').text()),	

	events: {
		'click. .add-button'  : 'addTask'
	
	},

	  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    
    $('submit-task').append(this.el);
    this.render();
    },

    render: function(){
    	var renderedTemplate = this.template(this.model.attributes)
    },

    addTask: function(){
	    var nameVal = this.$el.find('.task input').val();
	    this.model.set('task', nameVal);
	    this.model.save()
  	},

})
 
})
 var items = new ChecklistCollection();

 items.fetch().done(function(){
 	items.each(function(checklist){
 		new ChecklistView({model: checklist});
 	})
 });