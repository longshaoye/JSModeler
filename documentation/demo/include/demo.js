JSMDemo = function ()
{
	this.viewer = null;
	this.uiDiv = null;
	this.editor = null;
};

JSMDemo.prototype =
{
	Initialize : function (canvasName, uiDivName)
	{
		var viewerSettings = {
			'cameraEyePosition' : [-3.0, -2.5, 2.0],
			'cameraCenterPosition' : [0.0, 0.0, 0.0],
			'cameraUpVector' : [0.0, 0.0, 1.0],
			'fieldOfView' : 45.0,
			'nearClippingPlane' : 0.1,
			'farClippingPlane' : 1000.0,
			'lightAmbientColor' : [0.5, 0.5, 0.5],
			'lightDiffuseColor' :	[0.8, 0.8, 0.8]
		};

		this.viewer = new JSM.Viewer ();
		this.uiDiv = document.getElementById (uiDivName);
		this.editor = new Editor ();

		if (!this.viewer.Start (canvasName, viewerSettings)) {
			return false;
		}

		this.viewer.Draw ();
		return true;
	},
	
	GenerateCuboidUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Cuboid parameters');
		this.GenerateUITextElement ('x size:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('y size:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('z size:');
		this.GenerateUIInputElement ('1.0');

		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GenerateCuboid ();});
	},

	GenerateCuboid : function ()
	{
		var inputs = document.getElementsByTagName ('input');
		var xSize = parseFloat (inputs[0].value);
		var ySize = parseFloat (inputs[1].value);
		var zSize = parseFloat (inputs[2].value);
		
		var body = new JSM.Body ();
		if (xSize <= 0.0 || xSize <= 0.0 || xSize <= 0.0) {
			this.AddBodyToViewer (body);
			return;
		}
		
		body = JSM.GenerateCuboid (xSize, ySize, zSize);
		this.AddBodyToViewer (body);
	},

	GenerateSphereUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Sphere parameters');
		this.GenerateUITextElement ('radius:');
		this.GenerateUIInputElement ('0.5');
		this.GenerateUITextElement ('segmentation:');
		this.GenerateUIInputElement ('50');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('smooth surface', true);
	
		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GenerateSphere ();});
	},

	GenerateSphere : function ()
	{
		var inputs = document.getElementsByTagName ('input');
		var radius = parseFloat (inputs[0].value);
		var segmentation = parseInt (inputs[1].value);
		var curved = inputs[2].checked;
		
		var body = new JSM.Body ();
		if (radius <= 0.0 || segmentation <= 1) {
			this.AddBodyToViewer (body);
			return;
		}

		body = JSM.GenerateSphere (radius, segmentation, curved);
		this.AddBodyToViewer (body);
	},

	GenerateCylinderUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Cylinder parameters');
		this.GenerateUITextElement ('radius:');
		this.GenerateUIInputElement ('0.5');
		this.GenerateUITextElement ('height:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('segmentation:');
		this.GenerateUIInputElement ('50');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('with top and bottom', true);
		this.GenerateUICheckBoxElement ('smooth surface', true);
	
		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GenerateCylinder ();});
	},

	GenerateCylinder : function ()
	{
		var inputs = document.getElementsByTagName ('input');
		var radius = parseFloat (inputs[0].value);
		var height = parseFloat (inputs[1].value);
		var segmentation = parseInt (inputs[2].value);
		var withTopAndBottom = inputs[3].checked;
		var curved = inputs[4].checked;
		
		var body = new JSM.Body ();
		if (radius <= 0.0 || height <= 0.0 || segmentation <= 2) {
			this.AddBodyToViewer (body);
			return;
		}

		body = JSM.GenerateCylinder (radius, height, segmentation, withTopAndBottom, curved);
		this.AddBodyToViewer (body);
	},

	GenerateConeUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Cylinder parameters');
		this.GenerateUITextElement ('top radius:');
		this.GenerateUIInputElement ('0.3');
		this.GenerateUITextElement ('bottom radius:');
		this.GenerateUIInputElement ('0.6');
		this.GenerateUITextElement ('height:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('segmentation:');
		this.GenerateUIInputElement ('50');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('with top and bottom', true);
		this.GenerateUICheckBoxElement ('smooth surface', true);
	
		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GenerateCone ();});
	},

	GenerateCone : function ()
	{
		var inputs = document.getElementsByTagName ('input');
		var topRadius = parseFloat (inputs[0].value);
		var bottomRadius = parseFloat (inputs[1].value);
		var height = parseFloat (inputs[2].value);
		var segmentation = parseInt (inputs[3].value);
		var withTopAndBottom = inputs[4].checked;
		var curved = inputs[5].checked;
		
		var body = new JSM.Body ();
		if (topRadius < 0.0 || bottomRadius < 0.0 || (topRadius == 0.0 && bottomRadius == 0.0) || height <= 0.0 || segmentation <= 2) {
			this.AddBodyToViewer (body);
			return;
		}

		body = JSM.GenerateCone (topRadius, bottomRadius, height, segmentation, withTopAndBottom, curved);
		this.AddBodyToViewer (body);
	},

	GenerateTorusUI : function ()
	{
		this.ClearUI ();
		this.GenerateUITitleElement ('Torus parameters');
		this.GenerateUITextElement ('outer radius:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('inner radius:');
		this.GenerateUIInputElement ('0.5');
		this.GenerateUITextElement ('outer segmentation');
		this.GenerateUIInputElement ('50');
		this.GenerateUITextElement ('inner segmentation:');
		this.GenerateUIInputElement ('50');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('smooth surface', true);
	
		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GenerateTorus ();});
	},

	GenerateTorus : function ()
	{
		var inputs = document.getElementsByTagName ('input');
		var outerRadius = parseFloat (inputs[0].value);
		var innerRadius = parseFloat (inputs[1].value);
		var outerSegmentation = parseFloat (inputs[2].value);
		var innerSegmentation = parseInt (inputs[3].value);
		var curved = inputs[4].checked;
		
		var body = new JSM.Body ();
		if (outerRadius < 0.0 || innerRadius < 0.0 || outerSegmentation <= 2 || innerSegmentation <= 2) {
			this.AddBodyToViewer (body);
			return;
		}

		body = JSM.GenerateTorus (outerRadius, innerRadius, outerSegmentation, innerSegmentation, curved);
		this.AddBodyToViewer (body);
	},

	GeneratePolyTorusUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Prism parameters');
		this.GenerateUITextElement ('base polygon:');
		this.GenerateUICanvasElement ('editorCanvas');
		this.GenerateUITextElement ('outer radius:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('outer segmentation:');
		this.GenerateUIInputElement ('50');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('smooth surface', true);

		var settings = {
			mode : 'Polygon',
			color : '#00aa00'
		};
	
		this.editor.Initialize ('editorCanvas', settings);
		this.editor.AddCoord ([100, 50]);
		this.editor.AddCoord ([100, 100]);
		this.editor.AddCoord ([50, 100]);
		this.editor.AddCoord ([50, 150]);
		this.editor.AddCoord ([150, 150]);
		this.editor.AddCoord ([150, 50]);
		this.editor.AddCoord ([100, 50]);

		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GeneratePolyTorus ();});
	},

	GeneratePolyTorus : function ()
	{
		var ConvertValue = function (x, size, scale)
		{
			var half = size / 2.0;
			var result = x - half;
			return result * scale;
		}

		var body = new JSM.Body ();
		if (!this.editor.finished || this.editor.coords.length <= 2) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var inputs = document.getElementsByTagName ('input');
		var outerRadius = parseFloat (inputs[0].value);
		var outerSegmentation = parseFloat (inputs[1].value);
		var curved = inputs[2].checked;

		if (outerRadius <= 0.0 || outerSegmentation <= 2) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var basePoints = [];
		var coords = this.editor.coords;
		
		var i, coord, x, y;
		for (i = 0; i < coords.length; i++) {
			coord = coords[i];
			x = ConvertValue (coord[0], this.editor.canvas.width, 1.0 / 100.0);
			y = -ConvertValue (coord[1], this.editor.canvas.height, 1.0 / 100.0);
			basePoints.push (new JSM.Coord2D (x, y));
		}

		body = JSM.GeneratePolyTorus (basePoints, outerRadius, outerSegmentation, curved);
		this.AddBodyToViewer (body);
	},

	GeneratePrismUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Prism parameters');
		this.GenerateUITextElement ('base polygon:');
		this.GenerateUICanvasElement ('editorCanvas');
		this.GenerateUITextElement ('height:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('with top and bottom', true);
		
		var settings = {
			mode : 'Polygon',
			color : '#00aa00'
		};
	
		this.editor.Initialize ('editorCanvas', settings);
		this.editor.AddCoord ([50, 50]);
		this.editor.AddCoord ([50, 100]);
		this.editor.AddCoord ([100, 100]);
		this.editor.AddCoord ([100, 150]);
		this.editor.AddCoord ([150, 150]);
		this.editor.AddCoord ([150, 50]);
		this.editor.AddCoord ([50, 50]);

		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GeneratePrism ();});
	},

	GeneratePrism : function ()
	{
		var ConvertValue = function (x, size, scale)
		{
			var half = size / 2.0;
			var result = x - half;
			return result * scale;
		}

		var body = new JSM.Body ();
		if (!this.editor.finished || this.editor.coords.length <= 2) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var inputs = document.getElementsByTagName ('input');
		var direction = new JSM.Vector (0.0, 0.0, 1.0);
		var height = parseFloat (inputs[0].value);
		var withTopAndBottom = inputs[1].checked;

		if (height <= 0.0) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var basePoints = [];
		var coords = this.editor.coords;
		
		var i, coord, x, y;
		for (i = 0; i < coords.length; i++) {
			coord = coords[i];
			x = ConvertValue (coord[0], this.editor.canvas.width, 1.0 / 100.0);
			y = -ConvertValue (coord[1], this.editor.canvas.height, 1.0 / 100.0);
			basePoints.push (new JSM.Coord (x, y, -height / 2.0));
		}

		body = JSM.GeneratePrism (basePoints, direction, height, withTopAndBottom);
		this.AddBodyToViewer (body);
	},

	GeneratePrismShellUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Prismshell parameters');
		this.GenerateUITextElement ('base polygon:');
		this.GenerateUICanvasElement ('editorCanvas');
		this.GenerateUITextElement ('height:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('width:');
		this.GenerateUIInputElement ('0.1');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('with top and bottom', true);
		
		var settings = {
			mode : 'Polygon',
			color : '#00aa00'
		};
	
		this.editor.Initialize ('editorCanvas', settings);
		this.editor.AddCoord ([50, 50]);
		this.editor.AddCoord ([50, 100]);
		this.editor.AddCoord ([100, 100]);
		this.editor.AddCoord ([100, 150]);
		this.editor.AddCoord ([150, 150]);
		this.editor.AddCoord ([150, 50]);
		this.editor.AddCoord ([50, 50]);

		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GeneratePrismShell ();});
	},

	GeneratePrismShell : function ()
	{
		var ConvertValue = function (x, size, scale)
		{
			var half = size / 2.0;
			var result = x - half;
			return result * scale;
		}

		var body = new JSM.Body ();
		if (!this.editor.finished || this.editor.coords.length <= 2) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var inputs = document.getElementsByTagName ('input');
		var direction = new JSM.Vector (0.0, 0.0, 1.0);
		var height = parseFloat (inputs[0].value);
		var width = parseFloat (inputs[1].value);
		var withTopAndBottom = inputs[2].checked;

		if (width <= 0.0 || height <= 0.0) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var basePoints = [];
		var coords = this.editor.coords;
		
		var i, coord, x, y;
		for (i = 0; i < coords.length; i++) {
			coord = coords[i];
			x = ConvertValue (coord[0], this.editor.canvas.width, 1.0 / 100.0);
			y = -ConvertValue (coord[1], this.editor.canvas.height, 1.0 / 100.0);
			basePoints.push (new JSM.Coord (x, y, -height / 2.0));
		}
		
		body = JSM.GeneratePrismShell (basePoints, direction, height, width, withTopAndBottom);
		this.AddBodyToViewer (body);
	},

	GenerateLineShellUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Prismshell parameters');
		this.GenerateUITextElement ('base polygon:');
		this.GenerateUICanvasElement ('editorCanvas');
		this.GenerateUITextElement ('height:');
		this.GenerateUIInputElement ('1.0');
		this.GenerateUITextElement ('width:');
		this.GenerateUIInputElement ('0.1');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('with start and end', true);
		this.GenerateUICheckBoxElement ('with top and bottom', true);
		
		var settings = {
			mode : 'Polyline',
			color : '#00aa00'
		};
	
		this.editor.Initialize ('editorCanvas', settings);
		this.editor.AddCoord ([50, 50]);
		this.editor.AddCoord ([50, 100]);
		this.editor.AddCoord ([100, 100]);
		this.editor.AddCoord ([100, 150]);
		this.editor.AddCoord ([150, 150]);
		this.editor.AddCoord ([150, 50]);
		this.editor.AddCoord ([150, 50]);

		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GenerateLineShell ();});
	},

	GenerateLineShell : function ()
	{
		var ConvertValue = function (x, size, scale)
		{
			var half = size / 2.0;
			var result = x - half;
			return result * scale;
		}

		var body = new JSM.Body ();
		if (!this.editor.finished || this.editor.coords.length <= 1) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var inputs = document.getElementsByTagName ('input');
		var direction = new JSM.Vector (0.0, 0.0, 1.0);
		var height = parseFloat (inputs[0].value);
		var width = parseFloat (inputs[1].value);
		var withStartAndEnd = inputs[2].checked;
		var withTopAndBottom = inputs[3].checked;

		if (width <= 0.0 || height <= 0.0) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var basePoints = [];
		var coords = this.editor.coords;
		
		var i, coord, x, y;
		for (i = 0; i < coords.length; i++) {
			coord = coords[i];
			x = ConvertValue (coord[0], this.editor.canvas.width, 1.0 / 100.0);
			y = -ConvertValue (coord[1], this.editor.canvas.height, 1.0 / 100.0);
			basePoints.push (new JSM.Coord (x, y, -height / 2.0));
		}
		
		body = JSM.GenerateLineShell (basePoints, direction, height, width, withStartAndEnd, withTopAndBottom);
		this.AddBodyToViewer (body);
	},

	GenerateRevolvedUI : function ()
	{
		this.ClearUI ();
		
		this.GenerateUITitleElement ('Prism parameters');
		this.GenerateUITextElement ('polyLine:');
		this.GenerateUICanvasElement ('editorCanvas');
		this.GenerateUITextElement ('angle:');
		this.GenerateUIInputElement ('360.0');
		this.GenerateUITextElement ('segmentation:');
		this.GenerateUIInputElement ('50');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('with top and bottom', true);
		this.GenerateUICheckBoxElement ('smooth surface', true);
		
		var settings = {
			mode : 'Polyline',
			color : '#00aa00'
		};
	
		this.editor.Initialize ('editorCanvas', settings);
		this.editor.AddCoord ([150, 25]);
		this.editor.AddCoord ([150, 50]);
		this.editor.AddCoord ([125, 75]);
		this.editor.AddCoord ([150, 100]);
		this.editor.AddCoord ([125, 125]);
		this.editor.AddCoord ([125, 150]);
		this.editor.AddCoord ([150, 150]);
		this.editor.AddCoord ([150, 175]);
		this.editor.AddCoord ([150, 175]);

		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GenerateRevolved ();});
	},

	GenerateRevolved : function ()
	{
		var ConvertXValue = function (x, size, scale)
		{
			var result = x - size;
			return result * scale;
		}

		var ConvertYValue = function (x, size, scale)
		{
			var half = size / 2.0;
			var result = x - half;
			return -result * scale;
		}

		var body = new JSM.Body ();
		if (!this.editor.finished || this.editor.coords.length <= 1) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var inputs = document.getElementsByTagName ('input');
		var axis = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 0.0, 1.0));
		var angle = parseFloat (inputs[0].value) * JSM.DegRad;
		var segmentation = parseInt (inputs[1].value);
		var withTopAndBottom = inputs[2].checked;
		var curved = inputs[3].checked;

		if (segmentation <= 2) {
			this.AddBodyToViewer (body);
			return;
		}
		
		var polyLine = [];
		var coords = this.editor.coords;
		
		var i, coord, x, z;
		for (i = 0; i < coords.length; i++) {
			coord = coords[i];
			x = ConvertXValue (coord[0], this.editor.canvas.width, 1.0 / 100.0);
			z = ConvertYValue (coord[1], this.editor.canvas.height, 1.0 / 100.0);
			polyLine.push (new JSM.Coord (x, 0.0, z));
		}

		body = JSM.GenerateRevolved (polyLine, axis, angle, segmentation, withTopAndBottom, curved);
		this.AddBodyToViewer (body);
	},

	GenerateSolidUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Platonic solids');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Tetrahedron\')">tetrahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Hexahedron\')">hexahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Octahedron\')">octahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Dodecahedron\')">dodecahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Icosahedron\')">icosahedron</a>');

		this.GenerateUITitleElement ('<br>Archimedean solids');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'TruncatedTetrahedron\')">truncated tetrahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Cuboctahedron\')">cuboctahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'TruncatedCube\')">truncated cube</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'TruncatedOctahedron\')">truncated octahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Rhombicuboctahedron\')">rhombicuboctahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'TruncatedCuboctahedron\')">truncated cuboctahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'SnubCube\')">snub cube</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Icosidodecahedron\')">icosidodecahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'TruncatedDodecahedron\')">truncated dodecahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'TruncatedIcosahedron\')">truncated icosahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'Rhombicosidodecahedron\')">rhombicosidodecahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'TruncatedIcosidodecahedron\')">truncated icosidodecahedron</a>');
		this.GenerateUITextElement ('<a href="JavaScript:demo.GenerateSolid (\'SnubDodecahedron\')">snub dodecahedron</a>');
	},
	
	GenerateSolid : function (name)
	{
		body = JSM.GenerateSolidWithRadius (name, 1.0);
		this.AddBodyToViewer (body);
	},

	GenerateFunctionUI : function ()
	{
		this.ClearUI ();

		this.GenerateUITitleElement ('Function parameters');
		this.GenerateUITextElement ('function:');
		this.GenerateUIInputElement ('x * x - y * y');
		this.GenerateUITextElement ('x interval:');
		this.GenerateUIDoubleInputElement ('-1.0', '1.0');
		this.GenerateUITextElement ('y interval:');
		this.GenerateUIDoubleInputElement ('-1.0', '1.0');
		this.GenerateUITextElement ('segmentation:');
		this.GenerateUIInputElement ('50');
		this.GenerateUITextElement ('other:');
		this.GenerateUICheckBoxElement ('smooth surface', true);
	
		var myThis = this;
		this.GenerateUIButtonElement ('generate', function () {myThis.GenerateFunction ();});
	},

	TheFunction : function (x, y)
	{
		var inputs = document.getElementsByTagName ('input');
		var theFunction = inputs[0].value;
		return eval (theFunction);
	},

	GenerateFunction : function ()
	{
		var inputs = document.getElementsByTagName ('input');
		var xMin = parseFloat (inputs[1].value);
		var xMax = parseFloat (inputs[2].value);
		var yMin = parseFloat (inputs[3].value);
		var yMax = parseFloat (inputs[4].value);
		var segmentation = parseInt (inputs[5].value);
		var curved = inputs[6].checked;
		
		var body = new JSM.Body ();
		if (xMax <= xMin || yMax <= yMin || segmentation <= 1) {
			this.AddBodyToViewer (body);
			return;
		}

		var intervalMin = new JSM.Coord2D (xMin, yMin);
		var intervalMax = new JSM.Coord2D (xMax, yMax);
		
		var myThis = this;
		body = JSM.GenerateFunctionSurface (function (x, y) { return myThis.TheFunction (x, y); }, intervalMin, intervalMax, segmentation, curved);
		this.AddBodyToViewer (body);
	},

	ClearUI : function ()
	{
		this.uiDiv.innerHTML = '';
	},

	GenerateUITitleElement : function (text)
	{
		var div = document.createElement ('div');
		div.innerHTML = text;
		div.className = 'title';
		this.uiDiv.appendChild (div);
	},

	GenerateUITextElement : function (text)
	{
		var div = document.createElement ('div');
		div.innerHTML = text;
		div.className = 'text';
		this.uiDiv.appendChild (div);
	},

	GenerateUIInputElement : function (text)
	{
		var div = document.createElement ('div');
		var input = document.createElement ('input');
		input.type = 'text';
		input.value = text;
		input.className = 'large';
		div.appendChild (input);
		this.uiDiv.appendChild (div);
	},

	GenerateUIDoubleInputElement : function (text1, text2)
	{
		var div = document.createElement ('div');
		var input1 = document.createElement ('input');
		input1.type = 'text';
		input1.value = text1;
		input1.className = 'small';
		div.appendChild (input1);
		var input2 = document.createElement ('input');
		input2.type = 'text';
		input2.value = text2;
		input2.className = 'small';
		div.appendChild (input2);
		this.uiDiv.appendChild (div);
	},

	GenerateUICheckBoxElement : function (text, checked)
	{
		var div = document.createElement ('div');
		var input = document.createElement ('input');
		input.type = 'checkbox';
		input.checked = checked;
		div.className = 'checkbox';
		div.appendChild (input);
		div.appendChild (document.createTextNode (text));
		this.uiDiv.appendChild (div);
	},

	GenerateUIButtonElement : function (text, callback)
	{
		var myThis = this;

		var div = document.createElement ('div');
		var input = document.createElement ('input');
		input.type = 'button';
		input.value = text;
		input.onclick = callback;
		div.className = 'button';
		div.appendChild (input);
		this.uiDiv.appendChild (div);
	},

	GenerateUICanvasElement : function (canvasName)
	{
		var myThis = this;

		var div = document.createElement ('div');
		var canvas = document.createElement ('canvas');
		canvas.width = 200;
		canvas.height = 200;
		canvas.id = canvasName;
		div.appendChild (canvas);
		this.uiDiv.appendChild (div);
	},

	AddBodyToViewer : function (body)
	{
		var meshes = JSM.ConvertBodyToThreeMeshes (body);
		
		this.viewer.RemoveMeshes ();
		for (var i = 0; i < meshes.length; i++) {
			this.viewer.AddMesh (meshes[i]);
		}	
	},
	
	Resize : function ()
	{
		this.viewer.Resize ();
	},
	
	Draw : function ()
	{
		this.viewer.Draw ();
	}
};
