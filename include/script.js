let black = new Array(9820,9822,9821,9818,9819,9821,9822,9820,9823,9823,
	9823,9823,9823,9823,9823,9823);

let white = new Array(9817,9817,9817,9817,9817,9817,9817,9817,9814,9816,
	9815,9813,9812,9815,9816,9814);

$(document).ready(function(){
	
	init();
});

function init()
{
	window.piece = null;
	window.row = null;
	window.square = null;
	window.orig_square = null;

	$('.square').click(function(){
		let piece = $(this).data('piece');
		let square = $(this).data('square');
		let row = $(this).data('row');
		window.piece = piece;
		window.row = row;
		window.square = square;
		window.orig_square = $(this);
		let knights = [9822, 9816];
		$('.square').removeClass('pink');
		if(jQuery.inArray(piece, knights) >= 0) {
			let allowed = getAllowed(row, square, piece);
			allowed.forEach(function(value){
				let r = row + value[0];
				let s = square + value[1];
				$('.square').each(function(){
					if($(this).data('row') == r && $(this).data('square') == s) {
						$(this).addClass('pink');
						move();
					}
				});
			});
		}
		
	});
}

function move()
{
	let piece = window.piece;
	let orig_square = window.orig_square;
	$('.square.pink').click(function(e){
		// Remove piece from old square
		orig_square.data('piece', '');
		orig_square.find('.text').first().html('');
		$(this).data('piece', piece);// Set piece on new square
		$(this).find('.text').first().html('&#' + piece + ';');
		$(this).removeClass('pink');// Clear all valid squares
		init();
	});
}

/**
* Gets an array of allowed moves for a specific Knigt
* @depends-on: occupied(), get_pieces()
*/
function getAllowed(row, square, piece)
{
		let allowed = new Array();
		// A knight can make a possible of 8 moves,
		// If it's a legal move, we push the square
		// coordinates (delta) onto the allowed array.



		if((row - 1) >= 0 && (square - 2) > 0) {
			if(!occupied(piece, [-1, -2])) {
				allowed.push([-1, -2]);
			}
		}
		if((row - 2) >= 0 && (square - 1) > 0) {
			if(!occupied(piece, [-2, -1])) {
				allowed.push([-2, -1]);
			}
		}

		if((row - 1) >= 0 && (square + 2) <= 8) {
			if(!occupied(piece, [-1, 2])) {
				allowed.push([-1, 2]);
			}
		}

		if((row - 2) >= 0 && (square + 1) <= 8) {
			if(!occupied(piece, [-2, 1])) {
				allowed.push([-2, 1]);
			}
		}

		if((row +  1) < 8 && (square + 2) <= 8) {
			if(!occupied(piece, [1, 2])) {
				allowed.push([1, 2]);
			}
		}
		if((row + 2) < 8 && (square + 1) <= 8) {
			if(!occupied(piece, [2, 1])) {
				allowed.push([2, 1]);
			}
		}

		if((row +  1) < 8 && (square - 2) > 0) {
			if(!occupied(piece, [1, -2])) {
				allowed.push([1, -2]);
			}
		}
		if((row + 2) < 8 && (square - 1) > 0) {
			if(!occupied(piece, [2, -1])) {
				allowed.push([2, -1]);
			}
		}
		
		return allowed;
}
/*
* This function takes start and target parameter
*
* */
function occupied(piece, target)
{
	let pieces = get_pieces(piece);
	let r = row + target[0];
	let s = square + target[1];
	let sq = $('.square[data-row=' + r + '][data-square=' + s + ']').first();
	let target_piece = sq.data('piece');
	if(jQuery.inArray(target_piece, pieces) != -1) {
		return true;
	};
	return false;
}

function get_pieces(piece)
{
	if(jQuery.inArray(piece, white) != -1) {
		return white;
	};
	if(jQuery.inArray(piece, black) != -1) {
		return black;
	};

	return new Array();
}