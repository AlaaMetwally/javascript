selected_number = document.getElementById("selected").value;
var previous = new Array();
var num = 0;
genarate_grid("20");
document.getElementById("20").selected = true;
document.getElementById("chosen").selected = true;
function genarate_grid(number) {
    var screen = document.getElementById("screen");
    for (var i = 0; i < number; i++) {
        var oneline = document.createElement("div");
        screen.appendChild(oneline);
        for (var j = 0; j < number; j++) {
            var one_grid_id = i + "_" + j;
            var one_grid = document.createElement("span");
            one_grid.className = "inactive";
            one_grid.id = one_grid_id;
            oneline.appendChild(one_grid);
        }
    }
}
function screen_size() {
    var element = document.getElementById("screen");
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}
var selected = document.querySelector('#selected');
selected.addEventListener('click', function (e) {
    var selected_number = document.getElementById("selected").value;
    if (selected_number == 20) {
        screen_size();
        genarate_grid(20);
        var node = document.getElementsByTagName('span');
        var element = document.getElementById("screen");
        var group = document.getElementById("buttons");
        element.style.width = "1040px";
        group.style.top = "0px";
        for (var i = 0; i < node.length; i++) {
            node[i].style.width = "50px";
        }
    }
    else if (selected_number == 50) {
        screen_size();
        genarate_grid(50);
        var node = document.getElementsByTagName('span');
        var element = document.getElementById("screen");
        var group = document.getElementById("buttons");
        element.style.width = "1001px";
        group.style.top = "160px";
        for (var i = 0; i < node.length; i++) {
            node[i].style.width = "18px";
            node[i].style.height = "10px";
        }
    }
    else if (selected_number == 100) {
        screen_size();
        genarate_grid(100);
        var node = document.getElementsByTagName('span');
        var element = document.getElementById("screen");
        var group = document.getElementById("buttons");
        element.style.width = "1200px";
        group.style.top = "560px";
        for (var i = 0; i < node.length; i++) {
            node[i].style.width = "10px";
            node[i].style.height = "8px";
        }
    }
});
var selector = document.querySelector('#screen');
selector.addEventListener('click', function (e) {
    if (document.getElementById(e.target.id).classList.contains("inactive") == true) {
        document.getElementById(e.target.id).classList.toggle('active');
        document.getElementById(e.target.id).classList.remove("inactive");
    }
    else if (document.getElementById(e.target.id).classList.contains("active") == true) {
        document.getElementById(e.target.id).classList.toggle('inactive');
        document.getElementById(e.target.id).classList.remove("active");
    }
});
var reset = document.getElementById("reset");
reset.addEventListener('click', function (e) {
    num = 0;
    var els = document.getElementsByClassName("active");
    for (var i = 0; i < els.length; i++) {
        while (els.length) {

            document.getElementById(els[i].id).classList.toggle('inactive');
            document.getElementById(els[i].id).classList.remove("active");
        }
    }
});
var begin = document.getElementById("begin");
begin.addEventListener('click', async function (e) {
    $('#prev').attr("enabled", false);
    $('#next').attr("enabled", false);
    var interval = document.getElementById("time");
    var chosen = interval.options[interval.selectedIndex].value;
    if (begin.textContent == "Start") {
        this.textContent = "Pause";
        if (chosen == 100) {
            await sleep(100);
            console.log(chosen);
            make_iteration();
        }
        else if (chosen == 200) {
            await sleep(200);
            console.log(chosen);
            make_iteration();
        }
        else if (chosen == 500) {
            await sleep(500);
            console.log(chosen);
            make_iteration();
        }
        else if (chosen == 1000) {
            await sleep(1000);
            console.log(chosen);
            make_iteration();
        }
    }
    else {
        this.textContent = "Start";
    }
    while (begin.textContent == "Pause") {

        await sleep(interval.options[interval.selectedIndex].value);
        console.log("loop " + interval.options[interval.selectedIndex].value);
        make_iteration();
    }
});
var next = document.getElementById("next");
next.addEventListener("click", function (e) {
    console.log("next");
    make_iteration();
});
var prev = document.getElementById("prev");
prev.addEventListener("click", function (e) {
    if (num == 0) {
        $('#prev').attr("enabled", false);
    }
    else {
        console.log(num);
        prev_iteration();
        num--;
    }
});
function prev_iteration() {
    $("#screen").html(previous.pop());
}
function make_iteration() {
    console.log(num);
    previous[num] = $("#screen").clone();
    num++;
    var all_active = document.querySelectorAll(".active");
    var all_inactive = document.querySelectorAll(".inactive");
    var arrayActive = new Array();
    var arrayInActive = new Array();
    for (var i = 0; i < all_active.length; i++) {
        var neightbrs = generate_neighbours(all_active[i].id);
        var countActive = 0;
        var countInActive = 0;
        for (var j = 0; j < neightbrs.length; j++) {
            if (document.getElementById(neightbrs[j]).className == "active") {
                countActive++;
            }
            else {
                countInActive++;
            }
        }
        if (countActive < 2) {
            arrayInActive.push(all_active[i].id);
        }
        else if (countActive == 2 || countActive == 3) {
            //console.log("this will stay active", all_active[i].id);
        }
        else if (countActive > 3) {
            arrayInActive.push(all_active[i].id);
        }
    }
    for (var i = 0; i < all_inactive.length; i++) {
        var neightbrs = generate_neighbours(all_inactive[i].id);
        var countActive = 0;
        var countInActive = 0;
        for (var j = 0; j < neightbrs.length; j++) {
            if (document.getElementById(neightbrs[j]).className == "active") {
                countActive++;
            }
            else {
                countInActive++;
            }
        }

        if (countActive == 3) {
            arrayActive.push(all_inactive[i].id);
        }
    }
    trans_to_active(arrayActive);
    trans_to_inactive(arrayInActive);

}
function trans_to_active(ids_array) {
    ids_array.forEach(element => {
        document.getElementById(element).classList.toggle('active');
        document.getElementById(element).classList.remove("inactive");
    });
}
function trans_to_inactive(ids_array) {
    ids_array.forEach(element => {
        document.getElementById(element).classList.toggle('inactive');
        document.getElementById(element).classList.remove("active");
    });
}
function generate_neighbours(id) {
    var selected_number = parseInt(document.getElementById("selected").value);
    var after = id.split('_')[1];
    var before = id.split('_')[0];
    var neighbours = new Array();
    if ((parseInt(before) - 1) >= 0 && (parseInt(after) - 1) >= 0) {
        neighbours.push((parseInt(before) - 1) + "_" + (parseInt(after) - 1));
    }
    if ((parseInt(before) - 1) >= 0) {
        neighbours.push((parseInt(before) - 1) + "_" + parseInt(after));
    }
    if ((parseInt(before) - 1) >= 0 && (parseInt(after) + 1) < selected_number) {
        neighbours.push((parseInt(before) - 1) + "_" + (parseInt(after) + 1));
    }
    if ((parseInt(after) - 1) >= 0) {
        neighbours.push(parseInt(before) + "_" + (parseInt(after) - 1));
    }
    if ((parseInt(after) + 1) < selected_number) {
        neighbours.push(parseInt(before) + "_" + (parseInt(after) + 1));
    }
    if ((parseInt(before) + 1) < selected_number && (parseInt(after) - 1) >= 0) {
        neighbours.push((parseInt(before) + 1) + "_" + (parseInt(after) - 1));
    }
    if ((parseInt(before) + 1) < selected_number) {
        neighbours.push((parseInt(before) + 1) + "_" + parseInt(after));
    }
    if ((parseInt(before) + 1) < selected_number && (parseInt(after) + 1) < selected_number) {
        neighbours.push((parseInt(before) + 1) + "_" + (parseInt(after) + 1));
    }
    return neighbours;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}