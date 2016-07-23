Template.SideNav.onCreated(function(){
	var self = this
	self.autorun(function(){
		self.subscribe('recipes')
	})
})

Template.SideNav.helpers({
	count: () => {
		return Recipes.find({inMenu: true}).count()
	}
})