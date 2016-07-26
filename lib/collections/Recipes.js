Recipes = new Mongo.Collection('recipes')
Recipes.allow({
	insert: function (userId, doc) {
		return !!userId
	},
	update: function (userId, doc, fields, modifier) {
		return !!userId
	},
	remove: function (userId, doc) {
		return !!userId
	}
	// fetch: ['owner'],
	// transform: function () {
		
	// }
});
var Schemas = {};
Ingredient = new SimpleSchema({
	name: {
		type:String,
		label:'名称'
	},
	amount: {
		type:String,
		label:'数量'
	}
})
Schemas.Recipes = new SimpleSchema({
	name: {
		type: String,
		label: '名字'
	},
	desc: {
		type: String,
		label:'描述'
	},
	inMenu: {
		type:Boolean,
		defaultValue:false,
		optional:true,
		autoform:{
			type:'hidden'
		}
	},
	ingredients: {
		type: [Ingredient],
		label:'配料或种类'	
	},
	author: {
		type: String,
		label: '作者',
		autoValue:function(){
			return this.userId
		},
		autoform:{
			type: 'hidden'
		}
	},
	createAt: {
		type:Date,
		label:'创建时间',
		autoValue:function(){
			return new Date()
		},
		autoform:{
			type: 'hidden'
		}
	}
})
Meteor.methods({
    taggledMenuItem: function(id, currentState) {
        Recipes.update(id, {
            $set: {
                inMenu: !currentState
            }
        })
    },
    deleteRecipe: function(id){
    	Recipes.remove(id)
    }
})


Recipes.attachSchema(Schemas.Recipes,{transform: true})
AdminConfig = {
    adminEmails: ['unreal0@sina.cn'],
    collections: {
        Recipes: {}

    }
}
Recipes.attachSchema(Schemas.Recipes,{transform: true})
