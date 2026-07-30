var $ = function( id ) { return document.getElementById( id ); };
let res_straight_ele = $("res-straight");
let res_side_ele = $("res-side");
let res_back_ele = $("res-back");

let inter_w_ele = $("interance-w");
let door_th_ele = $("door-th");
let door_w_ele = $("door-w");
let furniture_h_ele = $("furniture-h");
let furniture_w_ele = $("furniture-w");
let furniture_d_ele = $("furniture-d");

const elements = [inter_w_ele, door_th_ele, door_w_ele, furniture_h_ele, furniture_w_ele, furniture_d_ele];
elements.forEach((v) => {
    v.addEventListener("input", (e) => {
	e.preventDefault();
	console.log(v.name);
	compute_constraint();
	
    });
});

function compute_constraint() {
    let inter_w = inter_w_ele.valueAsNumber;
    let door_th = door_th_ele.valueAsNumber;
    let door_w = door_w_ele.valueAsNumber;
    if (isNaN(inter_w) || isNaN(door_th) || isNaN(door_w)) {
	/* return false; */
	return;
    }
    
    let furniture_h = furniture_h_ele.valueAsNumber;
    let furniture_w = furniture_w_ele.valueAsNumber;
    let furniture_d = furniture_d_ele.valueAsNumber;

    res_back_ele.innerHTML = "";
    res_side_ele.innerHTML = "";
    res_straight_ele.innerHTML = "";
    if (!isNaN(furniture_h) && !isNaN(furniture_w)) {
	reset_flag = false;
	let a = Math.min(furniture_h,furniture_w);
	let b = Math.max(furniture_h,furniture_w);
	if (satisfyConstraint(inter_w,door_w,door_th,a,b)) {
	    res_back_ele.innerHTML = "اجل";
	} else {
	    res_back_ele.innerHTML = "كلا";
	}

    }
    if (!isNaN(furniture_h) && !isNaN(furniture_d)) {
	reset_flag = false;
	let a = Math.min(furniture_h,furniture_d);
	let b = Math.max(furniture_h,furniture_d);
	if (satisfyConstraint(inter_w,door_w,door_th,a,b)) {
	    res_side_ele.innerHTML = "اجل";
	} else {
	    res_side_ele.innerHTML = "كلا";
	}
    }
    if (!isNaN(furniture_w) && !isNaN(furniture_d)) {
	reset_flag = false;
	let a = Math.min(furniture_w,furniture_d);
	let b = Math.max(furniture_w,furniture_d);
	if (satisfyConstraint(inter_w,door_w,door_th,a,b)) {
	    res_straight_ele.innerHTML = "اجل";
	} else {
	    res_straight_ele.innerHTML = "كلا";
	}

    }
}
function satisfyConstraint(inter_w,door_w,door_th,a,b) {
    // angle is between furniture and the inner side of the door gap
    // constraint is:
    // door_width >= door_thick*tan(angle) + a/cos(angle)
    const cos_angle = (inter_w+door_th)/b;
    if (a > door_w) return false;
    if (cos_angle > 1) return true;
    const ratio = (door_th*Math.sqrt(1-cos_angle*cos_angle)+a)/cos_angle;
    
    return door_w > ratio;
}
