// $(function(){ // on dom ready

function saveElements() {
    localStorage.setItem("elements", JSON.stringify(cy.json().elements));
}

function getElements() {
    elements = localStorage.getItem("elements");
    if (elements && elements != "{}") {
        return JSON.parse(elements);
    }
    else {
        return null;
    }
}
var cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    selectionType: 'additive',
    autounselectify: false,
    minZoom: 1,
    maxZoom: 10,

    style: [{
        selector: 'node',
        css: {
            'content': 'data(user_says)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': 'white',
            'text-outline-width': 2,
            'text-outline-color': '#888',
            'shape': 'rectangle',
        }
    }, {
        selector: '$node > node',
        css: {
            'padding-top': '10px',
            'padding-left': '10px',
            'padding-bottom': '10px',
            'padding-right': '10px',
            'text-valign': 'top',
            'text-halign': 'center',
            'background-color': '#bbb'
        }
    }, {
        selector: 'edge',
        css: {
            'target-arrow-shape': 'triangle',
            // 'content': 'data(id)'
        }
    }, {
        selector: ':selected',
        css: {
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black',
            'text-outline-color': 'black',
        }
    }],
    elements: getElements(),
    layout: {
        name: 'preset',
        padding: 5
    }
});

// save elements to localstorage
cy.on('add, remove, position, data', function (evt) {
    saveElements();
});


/* Edge control */

var cxtdragStart = false;
var edgeFrom = null,
    edgeTo = null;

cy.on('cxtdrag', 'node', function(evt) {
    var node = evt.cyTarget;
    // console.log( 'cxtdrag ' + node.id() );
    cxtdragStart = true;
    edgeFrom = node;
});
cy.on('cxtdragover', 'node', function(evt) {
    var node = evt.cyTarget;
    if (!cxtdragStart || node == edgeFrom) {
        return;
    }
    edgeTo = node;
});
cy.on('cxtdragout', 'node', function(evt) {
    var node = evt.cyTarget;
    if (!cxtdragStart || node != edgeTo) {
        return
    }
    edgeTo = null;
});
cy.on('cxttapend', 'node', function(evt) {
    var node = evt.cyTarget;
    if (!cxtdragStart) {
        return
    }
    cxtdragStart = false;
    if (edgeTo == null) {
        return
    }
    cy.add({
        group: "edges",
        data: { source: edgeFrom.id(), target: edgeTo.id() }
    });
    edgeTo = null;
});

/* panel control */

$("#clear_btn").click(function() {
    if (confirm("Are you sure you want to clear all elements?")) {
        cy.elements().remove();
    }
});

// add intent
$("#add_intent_btn").click(function() {
    cy.$(":selected").unselect();
    cy.add({
        group: "nodes",
        data: { user_says: "", response: "" },
        position: { x: -cy.viewport().pan().x / cy.zoom() + 40, y: -cy.viewport().pan().y / cy.zoom() + 40 }
    }).select();
});


// delete intent or edge
$('body').keydown(function(event) {
    if ($("input[type='text']:focus").length > 0) {
        return;
    }
    var key = event.which || event.keyCode; // event.keyCode is used for IE8 and earlier
    if (key == 8) {
        cy.$(':selected').unselect().remove();
    }
})

// show or hide intent info editor
cy.on('select, unselect', 'node, edge', function(evt) {
    if (cy.$(":selected").length == 1 && cy.$("node:selected").length == 1) {
        var node = cy.$("node:selected")[0];
        $("#intent_info #user_says").val(node.data("user_says"));
        $("#intent_info #response").val(node.data("response"));
        $("#intent_info").show();
    }
    else {
        $("#intent_info").hide();
    }
});

// modify intent info
$("#intent_info").submit(function() {
    cy.$("node:selected").data({
        user_says: $("#intent_info #user_says").val(),
        response: $("#intent_info #response").val()
    }).unselect();
});

// }); // on dom ready
