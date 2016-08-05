$(function() {

	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var r = Math.floor(Math.random() * 0);
			var g = Math.floor(Math.random() * 255);
			var b = Math.floor(Math.random() * 0);
			$('<div>').addClass('block').attr('id', i + '-' + j).css('backgroundColor', 'rgba(0,' + g + ',' + b + ',0.5)').appendTo('.background');
		};
	};
    var dict = {
		'0-0': true,
		'0-1': true,
		'0-2': true
	};
	var snock = [{
		x: 0,
		y: 0
	}, {
		x: 0,
		y: 1
	}, {
		x: 0,
		y: 2
	}];
	
	// console.log(dict);
	for (var i = 0; i < snock.length; i++) {
		$('#' + snock[i].x + '-' + snock[i].y).addClass('snock');
	}
	function putfood() {
		do{
		var a = Math.floor(Math.random() * 20);
		var b = Math.floor(Math.random() * 20);
		}while(dict[a+'-'+b]);

		$('#' + a + '-' + b).addClass('food');
		return {
			x: a,
			y: b
		};
	}
	var food = putfood();
	var fangxiang = 'you';
	move = function() {
		var oldhead = snock[snock.length - 1];
		if (fangxiang == 'you') {
			var newhead = {
				x: oldhead.x,
				y: oldhead.y + 1
			}
			/*var newheadp={
				x: oldhead.x-1,
				y: oldhead.y+1
			}*/
			// console.log(newhead.x-1+'-'+newhead.y)
			// dict[newhead.x-1+'-'+newhead.y].animate({top:-10});
		}
		if (fangxiang == 'zuo') {
			var newhead = {
				x: oldhead.x,
				y: oldhead.y - 1
			};
		}
		if (fangxiang == 'shang') {
			var newhead = {
				x: oldhead.x - 1,
				y: oldhead.y
			};
		}
		if (fangxiang == 'xia') {
			var newhead = {
				x: oldhead.x + 1,
				y: oldhead.y
			}
		}

		// console.log(dict)
		if (dict[newhead.x + '-' + newhead.y]) {
			$('.end').css({
				display: 'block'
			});
			// console.log(dict)
			clearInterval(t);
			return;
		}
		if (newhead.x > 19 || newhead.x < 0 || newhead.y > 19 || newhead.y < 0) {
			$('.end').css({
				display: 'block'
			});
			clearInterval(t);
			return;
		}
		snock.push(newhead);
		dict[newhead.x + '-' + newhead.y] = true;
		// console.log(dict)
		$('#' + newhead.x + '-' + newhead.y).addClass('snock');
		if (newhead.x === food.x && newhead.y === food.y) {
			$('#' + food.x + '-' + food.y).removeClass('food');
			food = putfood();
		} else {
			var weiba = snock.shift();
			delete dict[weiba.x + '-' + weiba.y]
			$('#' + weiba.x + '-' + weiba.y).removeClass('snock');
		}
	}
	var t = setInterval(move, 300);

	$(document).on('keyup', function(e) {
		e.preventDefault();
		var biao = {
			'zuo': 37,
			'you': 39,
			'shang': 38,
			'xia': 40
		};
		if (Math.abs(e.keyCode - biao[fangxiang]) === 2) {
			return;
		};
		if (e.keyCode === 37) {
			fangxiang = 'zuo';
		}
		if (e.keyCode === 39) {
			fangxiang = 'you';
		}
		if (e.keyCode === 38) {
			fangxiang = 'shang';
		}
		if (e.keyCode === 40) {
			fangxiang = 'xia';
		}
	});
	$('.start').on('click', function() {
		$('.end').css({
			display: 'none'
		});
		location.reload();
	})
    
})