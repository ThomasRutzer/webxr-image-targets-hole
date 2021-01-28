import { Vector3, Quaternion } from "three";

function XrTrackedImage(image, width) {
    this._image = image;
    this._bitmap = null;
    this._width = width;
    this._measuredWidth = 0;
    this._trackable = false;
    this._tracking = false;
    this._emulated = false;
    this._pose = null;

    this._position = new Vector3();
    this._rotation = new Quaternion();
}
XrTrackedImage.prototype.constructor = XrTrackedImage;

XrTrackedImage.prototype.prepare = function () {
    var self = this;

    if (this._bitmap) {
        return {
            image: this._bitmap,
            widthInMeters: this._width
        };
    }

    return createImageBitmap(this._image)
        .then(function (bitmap) {
            self._bitmap = bitmap;
            return {
                image: self._bitmap,
                widthInMeters: self._width
            };
        });
};

XrTrackedImage.prototype.destroy = function () {
    this._image = null;
    this._pose = null;

    if (this._bitmap) {
        this._bitmap.close();
        this._bitmap = null;
    }
};

XrTrackedImage.prototype.getPosition = function () {
    if (this._pose) {
      this._position.copy(this._pose.transform.position);
    }

    return this._position;
};

XrTrackedImage.prototype.getRotation = function () {
    if (this._pose) this._rotation.copy(this._pose.transform.orientation);
    return this._rotation;
};

Object.defineProperty(XrTrackedImage.prototype, "image", {
    get: function () {
        return this._image;
    }
});

Object.defineProperty(XrTrackedImage.prototype, "width", {
    get: function () {
        return this._width;
    },
    set: function (value) {
        this._width = value;
    }
});

Object.defineProperty(XrTrackedImage.prototype, "trackable", {
    get: function () {
        return this._trackable;
    }
});

Object.defineProperty(XrTrackedImage.prototype, "tracking", {
    get: function () {
        return this._tracking;
    }
});

Object.defineProperty(XrTrackedImage.prototype, "emulated", {
    get: function () {
        return this._emulated;
    }
});

export { XrTrackedImage };
