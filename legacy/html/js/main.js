$(document).ready(function() {
	$('#show-timeline').click(function() {
		TIMELINE.grow();
	});

	$('#workboxx').hover(function() {
		$(this).toggleClass('tallest');
	});

	$('#disclaimer-wrapper').click(function() {
		$(this).fadeOut('slow');
	})
});


var TIMELINE = {
	data: $.getJSON('../cv2.json', function(data) {
			TIMELINE.data = data;
			TIMELINE.init(); //  in the callback waits for JSON to load befre initialising the page
	}),

	init: function() {
			// console.log(this.data);

		// initialise the time parameters
		this.range = {};
		this.range.startDate = Date.parse(this.data.Config.startDate); // from JSON file
		this.range.endDate = Date.parse(this.data.endDate || new Date()); //  from JSON file or today
		this.range.ms = Math.round(Math.abs(this.range.endDate - this.range.startDate)); // 86400000ms in a day
		this.range.days = Math.round(Math.abs(this.range.endDate - this.range.startDate) / 86400000); // 86400000ms in a day

			// console.log("range of " + this.range.days + " days");
		this.workbox = document.getElementById("workbox-container");
		this.projbox = document.getElementById("projects-container");

		this.blocksHTML = ''; // holds the HTML - loop through all blocks then append this on mass to the DOM

		// loop through JSON file, pre/post filter?

		for (var client in this.data.Clients) {
			this.renderBlock(client);
		};

		// move over to angular templated searchable - just for building/testing layouts

		// generate HTML before flush!
		this.flush();
	},

	flush: function() {
		var container = document.getElementById("blocks-container");
		container.innerHTML = this.blocksHTML;

		// hover sub info
		// moved into flush, or event listeners won't be added
		$('.block-sub').hover(function() {
			$(this).children().stop(true, true).fadeIn('fast');
			console.log($(this).children());
		}, function() {
			$(this).children().stop(true, true).fadeOut();
		});

		// when clicked.. display project/client
		$('.block-sub').click(function(e) {
			$(this).children().hide(function() { // fade out the hover

				// if the element with the ID is clicked then switch on that id
				// else go up the chain from the sub elements until we hit the parent
				// there are currently only 2 possible levels so this should be deep enough to catch all clicks

				if(e.target.id) {
					TIMELINE.switchTo(e.target.id);
				} else {
					if(e.target.parentNode.className == "project-block") { // if sub div has been clicked, propergate up to parent
						TIMELINE.switchTo(e.target.parentNode.parentNode.id);
					}
				}

			
				TIMELINE.shrink();
				$('#workbox').fadeIn('slow');
			});		
		});

		// client root
		$('.block-title').click(function(e) {
				TIMELINE.switchTo(e.target.parentNode.id); // this is global TIMELINE.switchTo() - can we reference internally to object?
				TIMELINE.shrink();
				///$('#blocks-container').addClass('noml');
				$('#workbox').fadeIn('slow');
		});
	},

	getOffset: function(date_in) {
		// get offset converts a date into a % offset
		// (ms since start date / ms in range) * 100 to convert to %
		return (((Date.parse(date_in) - this.range.startDate) / this.range.ms) * 100);
	},

	getLength: function(start, end) {
		// project length is x% where x = ((project.duration / _date_range.duration) * 100)
		// inputs already in %
		return (end - start);
	},

	shrink: function() {
		// if timeline is open, else do nothing
		if($('#workbox')[0].style.display !== 'block') {
			$('#workbox').fadeOut('fast');
			$('#blocks-container').addClass('noml');
			$('#blocks-container').addClass('shallow');
		}
	},

	grow: function() {
		$('#workbox').fadeOut('fast');
		$('#sub-nav').remove();
		$('#blocks-container').removeClass('shallow');
		$('#blocks-container').removeClass('noml');
	},

	switchTo: function(id, no_redraw) {

		var _id = id.split("-"),
			_data = this.data.Clients[(_id[0])],
			_work_html,
			_proj_html,
			_projnav_html;

		
		$('#projects-container').empty();

		if(_id[1]) {

			console.log('this is a project');
			
			// use i so can use same code as inner loop.. could be confusing?!
			var i = _id[1] - 1;

		} else {
			
			console.log('this is a client root');

			// default to the first project so we have something to display
			var i = 0;

		}


		_proj_html = '<div class="project">';

			
		_proj_html += '<div id="' + _data.projects[i].project_id + '" class="project-display-title">' + _data.projects[i].project_title + '</div>';
		
//		_proj_html += '<div class="project-display-date">' + _data.projects[i].start + '</div>';
//		_proj_html += '<div class="project-display-type">' + _data.projects[i].type + '</div>';

		
		if(_data.projects[i].images) {
			console.log("_data.projects[i].images.length:" + _data.projects[i].images.length);
			_proj_html += '<img class="project-display-image" src="/img/clients/' + _data.projects[i].images[0].filename + '" />';
	//		_proj_html += '<div class="project-display-caption">' + _data.projects[i].images[0].description + '</div>';
		}


		_proj_html += '<div class="project-display-description">' + _data.projects[i].project_description_s + '</div>';

		_proj_html += '</div>'; // close the project box


		// only blit if this is a sub project view
		this.projbox.innerHTML = _proj_html;







		_work_html  = '<div class="workbox-client-name">' + _data.client_name + '</div>';
		_work_html += '<div class="workbox-description-s">' + _data.client_description_s + '</div>';
		_work_html += '<div class="workbox-description-l">' + _data.client_description_l + '</div>';

		this.workbox.innerHTML = _work_html;





		// second retrieval not good but just for testing, only small loop of max 5 iterations

		_projnav_html = '<div id="sub-nav" class="projects">';

		// loop through to make list of projects
		// reverse loop puts latest at the top.. ok?
		for (var i = _data.projects.length - 1; i >= 0; i--) {
			
			// inline the onclick as this is a temporary div
			_projnav_html += '<div onclick="TIMELINE.switchTo(\'' + _data.projects[i].project_id + '\', true)" class="project-display-title">' + _data.projects[i].project_title + '</div>';

		};

		_projnav_html += '</div>'; // close the projects box




		
		// get the target client name and add a sub navigation menu to the side bar
		// remove this menu on grow()

		console.log("_id[0]:" + _id[0]);
		var put_here = '#' + _id[0];

		// remove the last sub nav if it exists
		if(!no_redraw) {
			$('#sub-nav').remove();	

			$(put_here).after(_projnav_html); // insert projnav after 
			// hide on insert and add fade in class
			$('#sub-nav').show('fast');
		}
		

	},

	processBlock: function(id) {

		//_PSUEDO_//
		// get start date & end date of block (client) if set
		// get array of projects
		// 		length, dates (start/end)
		// 		find first date and last date - use to compute block.duration if not explicitly set


		// add tags to global set object (one of each entry allowed, tag lists projects in array)


		// in loop, see if sub offset is less than block ofset, if so, change block offset to lower value
		// this will bring the start of the block further left to accomodate the earlier project
		// similarly do this for duration, so that the line extends long enough to meet the project

		var data = this.data.Clients[id],
			_subs = [],
			_sub_class,
			_block_start, // push the earliest date to the block
			_block_end, // push the latest date to the block
			_duration; // client duration

		for (var i = data.projects.length - 1; i >= 0; i--) {

			var start = this.getOffset(data.projects[i].start);
				// console.log("processing subs - start offset: " + start);


			// earliest project to set start of client range
			if((_block_start == undefined) || (_block_start >= start)) {_block_start = start;}
			
			// start is start of specific project - last project is end of range
			if((_block_end == undefined) || (_block_end <= start)) {_block_end = start;}

			// add class to right align - keep computation out of display logic

			if(start > 65) {
				_sub_class = "block-sub-r";
			} else {
				_sub_class = "block-sub-l";
			}

			_subs[i] = {
				offset: start,
				css_class: _sub_class,
				project_id: data.projects[i].project_id,
				project_title: data.projects[i].project_title,
				project_description_s: data.projects[i].project_description_s,
				type: data.projects[i].type
			}
				
		};

console.log("final - parent block - start offset: " + _block_start);


//		console.log(id)
console.log(data)
//		console.log(data.client_name)

		if(this.data.Clients[id].active) {
			// if client is still active, set to 100% width
			// renderBlock() will fit to maximum width
			_duration = _block_end = 100;
		} else {
			_duration = this.getLength(_block_start, _block_end);
		}

		return block = {
			client_id: id,
			client_name: data.client_name,
			client_description_s: data.client_description_s,
			client_description_l: data.client_description_l,
			duration: _duration, // %
			offset: _block_start, // %
			subs: _subs
		}

	},

	renderBlock: function(id) {
		// passed in client details

		var block = this.processBlock(id);


		// redundant after project length checks.. move out of display code
		if(block.duration > (100 - block.offset)) { // don't allow the duration to draw past 100% width
			block.duration = (100 - block.offset);
		}

		this.blocksHTML += '<div class="block" id="' + block.client_id + '">';
		this.blocksHTML +=	'	<div style="margin-left:' + block.offset + '%;" class="block-title">' + block.client_name + '</div>';
		this.blocksHTML += '	<div style="margin-left:' + block.offset + '%; width:' + block.duration + '%;" class="block-range"></div>';

		for(var subs = block.subs.length, i = 0; i < subs; i++){
			this.blocksHTML += '	<div id="' + block.subs[i].project_id + '" style="margin-left:' + block.subs[i].offset + '%;" class="block-sub ' + block.subs[i].css_class + '">';
			this.blocksHTML += '		<div class="project-block">';
			this.blocksHTML += '			<div class="project-title rel">' + block.subs[i].project_title + '</div>';
			this.blocksHTML += '			<div class="project-description-s rel">' + block.subs[i].project_description_s + '</div>';
			this.blocksHTML += '		</div>';
			this.blocksHTML += '	</div>';
		}

		this.blocksHTML += '</div>';

	}
};