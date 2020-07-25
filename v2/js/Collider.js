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
        let interaction = ColliderPairs.find(hash);
    }
}

class PointCollider extends Collider {
    constructor(gameObject) {
        super(gameObject);
        this.type = ColliderType.POINT;
    }
}

class RectCollider extends Collider {
    constructor(gameObject, size) {
        super(gameObject);

        this.type = ColliderType.RECT;

        if (size == undefined) size = { width: 0, height: 0 };

        this.size = Object.assign({}, size);
    }
}

class CircleCollider extends Collider {
    constructor(gameObject, circleRadius, circleCentre) {
        super(gameObject);

        this.type = ColliderType.CIRCLE;

        if (circleRadius == undefined) circleRadius = 0;
        if (circleCentre == undefined) circleCentre == gameObject.transform.position;

        this.radius = circleRadius;
        this.centre = circleCentre;
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
//Object.freeze(ColliderType);

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

function NONE_NONE() {return "NONE_NONE"}
function NONE_POINT() {return "NONE_POINT"}
function NONE_RECT() {return "NONE_RECT"}
function NONE_CIRCLE() {return "NONE_CIRCLE"}
function NONE_LINE() {return "NONE_LINE"}

function POINT_POINT() {return "POINT_POINT"}
function POINT_RECT() {return "POINT_RECT"}
function POINT_CIRCLE() {return "POINT_CIRCLE"}
function POINT_LINE() {return "POINT_LINE"}

function RECT_RECT() {return "RECT_RECT"}
function RECT_CIRCLE() {return "RECT_CIRCLE"}
function RECT_LINE() {return "RECT_LINE"}

function CIRCLE_CIRCLE() {return "CIRCLE_CIRCLE"}
function CIRCLE_LINE() {return "CIRCLE_LINE"}

function LINE_LINE() {return "LINE_LINE"}
