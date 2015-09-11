console.log('hello');

var validate = function(value) {
	if (!value || !value.trim()) {
		if (Meteor.isClient) {
			alert('Be more creative!');
		}
		throw 'up';
	}
};

TopicCollections = new Meteor.Collection('topics');


if (Meteor.isClient) {
	Template.topicForm.events({
		'submit form': function(e) {
			e.preventDefault();

			var $input = $('input');
			var value = $input.val();

			validate(value);
			TopicCollections.insert({title: value});

			$input.val('');
		}
	});

	Template.topicList.helpers({
		topics: function() {
			return TopicCollections.find({}, {sort: {likes: -1}});
		}
	});


	Template.topic.events({
		'click .btn': function() {
			TopicCollections.update(this._id, {$inc: {likes: 1}});
		}
	});

}

if (Meteor.isServer) {
}
