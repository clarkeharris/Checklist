Tasks = Backbone.Model.extend({
 
  initialize: function() {
    this.on('change', function(){
    })
  },
 
  idAttribute: '_id'

});
 
TasksCollection = Backbone.Collection.extend({
 
  model: Tasks,
  url: 'http://tiny-pizza-server.herokuapp.com/collections/ch-todo',

})
 
TasksView = Backbone.View.extend({
 
  template: _.template($('.user-list-item').text()),
  editTemplate: _.template($('.user-list-edit-item').text()),
 
  events: {
    'click .edit-button'    : 'editTask',
    'click .save-button'    : 'saveChanges',
    'click .delete-button'  : 'destroy',
    'keydown input'         : 'showChanges'
  },
 
  initialize: function(){
 
    this.listenTo(this.model, 'change', this.render);
 
 
    $('.center-column').prepend(this.el);
    this.render();
  },
 
  render: function(){
    var renderedTemplate = this.template(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  editTask: function(){
    var renderedTemplate = this.editTemplate(this.model.attributes)
    this.$el.html(renderedTemplate);
  },
 
  saveChanges: function(){
    var nameVal = this.$el.find('.task input').val();
    this.model.set('task', nameVal);
    this.model.save()
  },
 
  destroy: function(){
    this.model.destroy();
    this.remove();
  },
 
  showChanges: function(){
    if (this.model.get('task') !== this.$el.find('.task input').val()){
      this.$el.find('.task input').addClass('changed')
    } else {
      this.$el.find('.task input').removeClass('changed')
    }
  }

})
 
$(function(){
  $('.add-new').click(function(){
    var inputVal = $('.add-new-input').val()
    var newUserInstance = tasks.add({task: inputVal})
 
    newUserInstance.save()
 
  })
})
 
AddTasksView = Backbone.View.extend({
 
  initialize: function(){
    this.listenTo(tasks, 'add', function(user){
      new TasksView({model: user})
    })
  }
 
});
 var tasks = new TasksCollection();
var app = new AddTasksView();
tasks.fetch();
// create instances