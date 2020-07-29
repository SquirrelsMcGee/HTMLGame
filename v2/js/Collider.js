/*
const ColliderPairs = [
    [ColliderType.NONE, ColliderType.NONE],     // 0 0      0
    [ColliderType.NONE, ColliderType.POINT],    // 0 1      1
    [ColliderType.NONE, ColliderType.RECT],     // 0 4      4
    [ColliderType.NONE, ColliderType.CIRCLE],   // 0 16     16
    [ColliderType.NONE, ColliderType.LINE],     // 0 64     64

    [ColliderType.POINT, ColliderType.POINT],   // 1 1      2
    [ColliderType.POINT, ColliderType.RECT],    // 1 4      5
    [ColliderType.POINT, ColliderType.CIRCLE],  // 1 16     17
    [ColliderType.POINT, ColliderType.LINE],    // 1 64     65

    [ColliderType.RECT, ColliderType.RECT],     // 4 4      8
    [ColliderType.RECT, ColliderType.CIRCLE],   // 4 16     20
    [ColliderType.RECT, ColliderType.LINE],     // 4 64     68

    [ColliderType.CIRCLE, ColliderType.CIRCLE], // 16 16    32
    [ColliderType.CIRCLE, ColliderType.LINE],   // 16 64    80

    [ColliderType.LINE, ColliderType.LINE]      // 64 64    128
];
*/

class Collider {
    constructor(gameObject) {
        this.parent = gameObject;
        this.type = ColliderType.NONE;

        this.isColliding = false;
        this.otherCollider = null;
    }

    // Detects collision between 2 given colliders
    static detectCollision(c1, c2) {
        //
        let hash = c1.type + c2.type;
        let interaction = ColliderPairs[hash];

        let collisionExists = false;

        // If interaction is possible
        if (interaction != undefined) {
            collisionExists = interaction(c1, c2);
        }
        
        return collisionExists;
    }

    draw() {
        // Default
    }
}

class PointCollider extends Collider {
    constructor(gameObject) {
        super(gameObject);
        this.type = ColliderType.POINT;
    }

    draw() {
        let ctx = this.parent.engine.ctx;
        ctx.beginPath();
        ctx.fillRect(this.parent.transform.position.x - 1, this.parent.transform.position.y -1, 2, 2);
        ctx.stroke();
    }
}

class RectCollider extends Collider {
    constructor(gameObject, size) {
        super(gameObject);

        this.type = ColliderType.RECT;

        if (size == undefined) size = { width: 0, height: 0 };

        this.size = Object.assign({}, size);
    }

    draw() {
        let ctx = this.parent.engine.ctx;
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.rect(this.parent.transform.position.x, this.parent.transform.position.y, this.size.width, this.size.height);
        ctx.stroke();
        ctx.resetTransform();
    }
}

class CircleCollider extends Collider {
    constructor(gameObject, circleRadius) {
        super(gameObject);

        this.type = ColliderType.CIRCLE;
        //this.circleCentre = null;

        if (circleRadius == undefined) circleRadius = 0;
        //if (circleCentre == undefined) circleCentre == gameObject.transform.position;

        this.radius = circleRadius;
        //this.centre = circleCentre;
    }

    get centre() {
        let centre = { x: 0, y: 0 };
        centre.x = this.parent.transform.position.x + this.radius;
        centre.y = this.parent.transform.position.y + this.radius;
        return centre;
    }

    draw() {
        let ctx = this.parent.engine.ctx;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "green";
        ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
        ctx.arc(this.centre.x, this.centre.y, this.radius, 0, 2*Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

class LineCollider extends Collider {
    constructor(gameObject, startPos, endPos) {
        super(gameObject);

        this.type = ColliderType.LINE;

        if (startPos == undefined) startPos = { x: 0, y: 0 };
        if (endPos == undefined) endPos = { x: 0, y: 0 };

        this.start = startPos;
        this.end = endPos;
    }
}

class PolygonCollider extends Collider {
    constructor(gameObject) {
        super(gameObject);
    }
}

/*
    Collider type enum
*/
var ColliderType = {
    NONE: 0,
    POINT: 1,
    RECT: 4,
    CIRCLE: 16,
    LINE: 64,
    POLYGON: 1024
};
Object.freeze(ColliderType);

var ColliderPairs = {
    [ColliderType.NONE + ColliderType.NONE]      :  NONE_NONE,       // 0 0      0
    [ColliderType.NONE + ColliderType.POINT]     :  NONE_POINT,      // 0 1      1
    [ColliderType.NONE + ColliderType.RECT]      :  NONE_RECT,       // 0 4      4
    [ColliderType.NONE + ColliderType.CIRCLE]    :  NONE_CIRCLE,     // 0 16     16
    [ColliderType.NONE + ColliderType.LINE]      :  NONE_LINE,       // 0 64     64

    [ColliderType.POINT + ColliderType.POINT]    :  POINT_POINT,     // 1 1      2
    [ColliderType.POINT + ColliderType.RECT]     :  POINT_RECT,      // 1 4      5
    [ColliderType.POINT + ColliderType.CIRCLE]   :  POINT_CIRCLE,    // 1 16     17
    [ColliderType.POINT + ColliderType.LINE]     :  POINT_LINE,      // 1 64     65

    [ColliderType.RECT + ColliderType.RECT]      :  RECT_RECT,       // 4 4      8
    [ColliderType.RECT + ColliderType.CIRCLE]    :  RECT_CIRCLE,     // 4 16     20
    [ColliderType.RECT + ColliderType.LINE]      :  RECT_LINE,       // 4 64     68

    [ColliderType.CIRCLE + ColliderType.CIRCLE]  :  CIRCLE_CIRCLE,   // 16 16    32
    [ColliderType.CIRCLE + ColliderType.LINE]    :  CIRCLE_LINE,     // 16 64    80

    [ColliderType.LINE + ColliderType.LINE]      :  LINE_LINE        // 64 64    128
};

function NONE_ANY() { return false; }

function NONE_NONE(c1, c2)      { return NONE_ANY(); }
function NONE_POINT(c1, c2)     { return NONE_ANY(); }
function NONE_RECT(c1, c2)      { return NONE_ANY(); }
function NONE_CIRCLE(c1, c2)    { return NONE_ANY(); }
function NONE_LINE(c1, c2)      { return NONE_ANY(); }

function POINT_POINT(c1, c2) {
    return (
        (c1.parent.transform.position.x == c2.parent.transform.position.x) &&
        (c1.parent.transform.position.y == c2.parent.transform.position.y)
    );
}
function POINT_RECT(c1, c2) {
    let point, rect;

    if (c1.type == ColliderType.POINT) {
        point = c1;
        rect = c2;
    }
    else {
        point = c2;
        rect = c1;
    }

    return (
        (point.parent.transform.position.x >= rect.parent.transform.position.x) &&
        (point.parent.transform.position.x <= rect.parent.transform.position.x + rect.size.width) &&
        (point.parent.transform.position.y >= rect.parent.transform.position.y) &&
        (point.parent.transform.position.y <= rect.parent.transform.position.y + rect.size.height)
    );
}
function POINT_CIRCLE(c1, c2) {
    let point, circle;

    if (c1.type == ColliderType.POINT) {
        point = c1;
        circle = c2;
    }
    else {
        point = c2;
        circle = c1;
    }

    let distX = (point.parent.transform.position.x - circle.centre.x);
    let distY = (point.parent.transform.position.y - circle.centre.y);

    let distance = Math.sqrt( (distX * distX) + (distY * distY) );
    return (
        distance <= circle.radius
    );
}
function POINT_LINE(c1, c2) {return "POINT_LINE"}

function RECT_RECT(c1, c2) {
    // No need for type check here
    let p1 = c1.parent.transform.position;
    let p2 = c2.parent.transform.position;
    let s1 = c1.size;
    let s2 = c2.size;

    return (
        (p1.x + s1.width >= p2.x) &&
        (p1.x <= p2.x + s2.width) &&
        (p1.y + s1.height >= p2.y) &&
        (p1.y <= p2.y + s2.height)
    );

}
function RECT_CIRCLE(c1, c2) {
    let rect, circle;

    if (c1.type == ColliderType.RECT) {
        rect = c1;
        circle = c2;
    } else {
        rect = c2;
        circle = c1;
    }

    let cx = circle.centre.x;
    let cy = circle.centre.y;

    let rx = rect.parent.transform.position.x;
    let ry = rect.parent.transform.position.y;
    let rw = rect.size.width;
    let rh = rect.size.height;

    let closestEdgeX = cx;
    let closestEdgeY = cy;

    if (cx < rx)            { closestEdgeX = rx; }
    else if (cx > rx+rw)    { closestEdgeX = rx + rw; }

    if (cy < ry)            { closestEdgeY = ry; }
    else if (cy > ry+rh)    { closestEdgeY = ry + rh; }

    let distX = cx - closestEdgeX;
    let distY = cy - closestEdgeY;

    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    return (distance <= circle.radius);

}
function RECT_LINE(c1, c2) { return "RECT_LINE" }

function CIRCLE_CIRCLE(c1, c2) {
    // No need for type check here

    let pos1 = c1.transform.position;
    let pos2 = c2.transform.position;

    let distX = pos1.x - pos2.x;
    let distY = pos1.y - pos2.y;

    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    return (distance <= circle.radius);
}
function CIRCLE_LINE(c1, c2) {return "CIRCLE_LINE"}

function LINE_LINE(c1, c2) {return "LINE_LINE"}
