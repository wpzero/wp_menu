/*
 * jQuery menu 1.00.1
 *
 *
 *wp
 * 
 *
 *Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */

(function($,undefined){

$.widget('wp.wp_menu',{
	
	version:'1.00.1',
	options:{
		hide:null,
		show:null,
		disable:false,
		onShowfn:null,
		scrollSelector:null,
		bindings:{}
	},
	_create:function(){
		var that=this,   //the that is used for the situation where in other element(not this.element) event function,in these functons the this is refered to other element
			options=this.options,
			offset=that.element.offset();
			if($('#menu_wp').length==0)
			{
				this.menu=$('<ul></ul>').addClass('wp-menu inline_block_ul').attr('id','menu_wp').appendTo($('body')).hide().css({
				'zIndex':9
				}).data('id',that.element.data('id'));
			}
			else
			{
				this.menu=$('#menu_wp').data('id',that.element.data('id'));
			}
			
		this._on(this.element,{
			click: "_btnClick"
		});
	},
	_init:function(){
		// alert('init');
	},
	_btnClick:function(){
		// alert('click');
		console.log('click');
		var that=this;
		// $('.wp-menu').not(this.menu).hide();
		
		// menu内容的处理
		this.menu.html('');
		$.each( this.options.bindings, function( i, val ) {
		  $('<li></li>').addClass('float_left_optn').append($('<a></a>').text(i).click(function(){
			val(that.element.data('id'));
			that.menu.hide();
		})).appendTo(that.menu);
		});
		$('<li></li>').css({'clear':'both'}).appendTo(this.menu);
		
		// menu位置的处理
		offset=this.element.offset();
		this.menu.css({
			'top':offset.top,
			'left':offset.left
		});
		this.menu.css('left','-='+this.menu.width());
		//再调整一些位置
		this.menu.css('left','-=250');
		this._trigger( "onShowfn", event, {
		      value: this.element.data('state'),
			  menu: this.menu
		});
		
		
		// 确定显示或隐藏
		if(that.menu.data('id')==that.element.data('id')){
			console.log('same id');
			console.log(this.menu);
			this.menu.toggle();
		}
		else{
			console.log('different id');
			console.log(this.menu);
			this.menu.show();
		}
		
		that.menu.data('id',that.element.data('id'));
		
		this.scrollY=$(that.options.scrollSelector).scrollTop();
		// 目的绑定scroll，可以随着动
		$(that.options.scrollSelector).unbind('scroll').bind('scroll',function(){
			var difY=$(this).scrollTop()-scrollY;
			that.menu.css('top','-='+difY.toString()+'px');
			scrollY=$(this).scrollTop();
		});
	},
	_destroy:function(){
		this.menu.remove();
	}
});	
})(jQuery);
