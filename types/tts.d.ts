/** @noSelfInFile */

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type nil = null;
type int = number;
type float = number;
type Vector = [float, float, float];
type Color = string | [float, float, float] | [float, float, float, float]; // TODO: No support for rgba format currently
type PlayerColor =
  | "White"
  | "Brown"
  | "Red"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Teal"
  | "Blue"
  | "Purple"
  | "Pink"
  | "Grey"
  | "Black";

interface Bounds {
  center: Vector;
  size: Vector;
  offset: Vector;
}

/**
 * @param index Index of the button you want to edit.
 * @param click_function A String of the function's name that will be run when button is clicked.
 * @param function_owner The Object which contains the click_function function. Optional, Defaults to Global.
 * @param label Text that appears on the button. Optional, defaults to an empty string.
 * @param position Where the button appears, relative to the Object's center. Optional, defaults to {x=0, y=0, z=0}.
 * @param rotation How the button is rotated, relative to the Object's rotation. Optional, defaults to {x=0, y=0, z=0}.
 * @param scale Scale of the button, relative to the Object's scale. Optional, defaults to {x=1, y=1, z=1}.
 * @param width How wide the button will be, relative to the Object. Optional, defaults to 100.
 * @param height How tall the button will be, relative to the Object. Optional, defaults to 100.
 * @param font_size Size the label font will be, relative to the Object. Optional, defaults to 100.
 * @param color A Color for the clickable button. Optional, defaults to {r=1, g=1, b=1}.
 * @param font_color A Color for the label text. Optional, defaults to {r=0, g=0, b=0}.
 * @param hover_color A Color for the background during mouse-over. Optional.
 * @param press_color A Color for the background when clicked. Optional.
 * @param tooltip Popup of text, similar to how an Object's name is displayed on mouseover. Optional, defaults to an empty string.
 */
interface Button {
  index: int;
  click_function: string;
  function_owner: TTSObject | Global;
  label: string;
  position: Vector;
  rotation: Vector;
  scale: Vector;
  width: float;
  height: float;
  font_size: float;
  color: Color;
  font_color: Color;
  hover_color: Color;
  press_color: Color;
  tooltip: string;
}

/**
 * @param index Index of the input you want to edit.
 * @param input_function The function's name that will be run when the input is selected.
 * @param function_owner The Object which contains the input_function function.
 * @param label Text that appears as greyed out text when there is no value in the input.
 * @param position Where the input appears, relative to the Object's center.
 * @param rotation How the input is rotated, relative to the Object's rotation.
 * @param scale Scale of the input, relative to the Object's scale.
 * @param width How wide the input will be, relative to the Object.
 * @param height How tall the input will be, relative to the Object.
 * @param font_size Size the label/value font will be, relative to the Object.
 * @param color A Color for the input's background.
 * @param font_color A Color for the value text.
 * @param tooltip A popup of text, similar to how an Object's name is displayed on mouseover.
 * @param alignment How text is aligned in the input box.
 * 1. Automatic
 * 2. Left
 * 3. Center
 * 4. Right
 * 5. Justified
 * @param value A String of the text entered into the input.
 * @param validation An Int which determines what characters can be input into the value.
 * 1. None
 * 2. Integer
 * 3. Float
 * 4. Alphanumeric
 * 5. Username
 * 6. Name
 * @param tab An Int which determines how pressing tab is handled when inputting.
 * 1. None
 * 2. Select Next Input
 * 3. Indent
 */
interface Input {
  index: int;
  input_function: string;
  function_owner: TTSObject | Global;
  label: string;
  position: Vector;
  rotation: Vector;
  scale: Vector;
  width: float;
  height: float;
  font_size: float;
  color: Color;
  font_color: Color;
  tooltip: string;
  alignment: int;
  value: string;
  validation: int;
  tab: int;
}

/**
 * @param description Description of the contained object.
 * @param gm_notes GM Notes on the contained object.
 * @param guid GUID of the contained object.
 * @param index Index of the contained object, represents the item's order in the container.
 * @param lua_script Lua script on the contained object.
 * @param lua_script_state Lua script saved state of the contained object.
 * @param memo Memo on the contained object.
 * @param name Name of the contained object. Will correspond with getName(), unless it's blank, in which case it'll be the internal resource name.
 * @param nickname Deprecated. Use name. Name of the item.
 * @param tags A table of  representing the tags on the contained object.
 */
interface ContainerObject {
  description: string;
  gm_notes: string;
  guid: string;
  index: int;
  lua_script: string;
  lua_script_state: string;
  memo: string;
  name: string;
  nickname: string;
  tags: string[];
}

/**
 * The click function which is activated by clicking this button has its own parameters it is passed automatically.
 * @param obj The Object the button is attached to.
 * @param player_clicker_color Player Color of the player that pressed the button.
 * @param alt_click True if a button other than left-click was used to click the button.
 */
declare type ButtonClickFunction = (
  obj: TTSObject,
  player_clicker_color: PlayerColor,
  alt_click: boolean
) => unknown;

/**
 * The click function which is activated by editing the text in this input has its own parameters it is passed automatically.
 * @param obj The Object the input is attached to.
 * @param player_clicker_color Player Color of the player that has selected/edited the input.
 * @param input_value Text currently in the input.
 * @param selected If the value box is still being edited or not.
 */
declare type InputFunction = (
  obj: TTSObject,
  player_clicker_color: PlayerColor,
  input_value: string,
  selected: boolean
) => unknown;

declare type ToggleFunction = (obj: TTSObject, value: 'True' | 'False')=>unknown;

declare type SliderFunction = (obj: TTSObject, value: string)=>unknown;

declare type ContextMenuFunction = (player_color: PlayerColor)=>unknown;

/**
 * Danger
 * ---
 * Component APIs are an advanced feature. An understanding of how Unity works is required to utilize them.
 * @param game_object The GameObject the Component composes.
 * @param name The name of the Component.
 * @param get Obtains the value of a given Variable on a Component.
 * @param getVars Returns a table mapping Var names (string) to their type, which is also represented as a string.
 * @param set Sets the Var of the specified name to the provided value.
 */
/** @noSelf */
interface Component {
  game_object: GameObject;
  name: string;
  get(name: string): unknown;
  getVars(): {[key: string]: string };
  set(name: string, value: unknown): boolean;
}

/**
 * @param name The name of the decal being placed.
 * @param url The file path or URL for the image to be displayed.
 * @param position Position to place Object.
 * @param rotation Rotation of the Object.
 * @param scale How the image is scaled. 1 is normal scale, 0.5 would be half sized, 2 would be twice as large, etc.
 */
interface Decal {
  name: string;
  url: string;
  position: Vector;
  rotation: Vector;
  scale: Vector;
}

/**
 * @param reveal Can the Object currently. If this is not used, the current setting for this Object is kept.
 * @param color The rotation Vector of the Object that best represents the given value pointing up. If this is not used, the current setting for this Object is kept. "Black" means "visible to all players." "All" means "visible to all players."
 * @param range How far from the Object the reveal effect reaches (radius, inches). If this is not used, the current setting for this Object is kept.
 */
interface FogOfWarSettings {
  reveal: boolean; color: PlayerColor | 'All'; range: float;
}

/**
 * Danger
 * ---
 * Component APIs are an advanced feature. An understanding of how Unity works is required to utilize them.
 * 
 * @param name The name of the Component.
 * @param getChild Returns a child GameObject matching the specified name.
 * @param getChildren Returns the list of children GameObjects.
 * @param getComponent Returns a Component matching the specified name from the GameObject's list of Components.
 * @param getComponentInChildren Returns a Component matching the specified name. Found by searching the Components of the GameObject and its children recursively (depth first).
 * @param getComponents Returns the GameObject's list of Components. name is optional, when specified only Components with specified name will be included.
 * @param getComponentsInChildren Returns a list of Components found by searching the GameObject and its children recursively (depth first). name is optional, when specified only Components with specified name will be included.
 */
/** @noSelf */
interface GameObject {
  name: string;
  getChild(name: string): GameObject;
  getChildren(): GameObject[];
  getComponent(name: string): Component;
  getComponentInChildren(name: string): Component;
  getComponents(name: string): Component[];
  getComponentsInChildren(name: string): Component[];
}

interface Joint {
  type: string;
  joint_object_guid: string;
  collision: boolean;
  break_force: float;
  break_torgue: float;
  axis?: Vector;
  anchor?: Vector;
  connector_anchor?: Vector;
  motor_force?: float;
  motor_velocity?: float;
  motor_free_spin?: boolean;
  spring?: float;
  damper?: float;
  max_distance?: float;
  min_distance?: float;
}

/**
 * @param position Local Position of the snap point. When attached to an object, position is relative to the object's center.
 * @param rotation Local Rotation of the snap point. When attached to an object, rotation is relative to the object's rotation.
 * @param rotation_snap Whether the snap point is a rotation snap point.
 * @param tags Table of  representing the tags associated with the snap point.
 */
interface SnapPoint {
  position: Vector;
  rotation: Vector;
  rotation_snap: boolean;
  tags: string[];
}

/**
 * Returns a table of sub-tables. Each sub-table represents one other state.
 * 
 *  - name: Name of the item.
 *  - description: Description of the item.
 *  - guid: GUID of the item.
 *  - id: Index of the item, represents the item's order in the states.
 *  - lua_script: Any Lua scripting saved on the item.
 *  - lua_script_state: Any JSON save data on this item.
 *  - nickname: A duplicate of the "name" field. This is for backwards compatibility purposes only.
 */
interface State {
  name: string;
  description: string;
  guid: string;
  id: int;
  lua_script: string;
  lua_script_state: string;
}

/**
 * @param points Table containing Vector positions for each "point" on the line.
 * @param color Color the line will be. Optional, defaults to {1,1,1}.
 * @param thickness How thick the line is (in Unity units). Optional, defaults to default line size (0.1).
 * @param rotation Rotation Vector for the line to be angled. Optional, defaults to {0,0,0}.
 * @example
 */
interface VectorLine {
  points: Vector[];
  color: Color;
  thickness: float;
  rotation: Vector;
}

/** @noSelf */
interface Global {
  /**
   * Add a Decal onto an object or the game world.
   * 
   * Relative Vectors
   * ---
   * When using this function, the vector parameters (position, rotation) are relative to what the decal is being placed on. For example, if you put a decal at {0,0,0} on Global, it will attach to the center of the game room. If you do the same to an object, it will place the decal on the origin point of the object.
   * @param parameters A Table of parameters used to determine how the function will act.
   * - parameters.name: The name of the decal being placed.
   * - parameters.url: The file path or URL for the image to be displayed.
   * - parameters.position: Position to place Object.
   * - parameters.rotation: Rotation of the Object.
   * - parameters.scale: How the image is scaled. 1 is normal scale, 0.5 would be half sized, 2 would be twice as large, etc.
   * @example
   * function onLoad()
   *     local params = {
   *         name     = "API Icon",
   *         url      = "https://api.tabletopsimulator.com/img/TSIcon.png",
   *         position = {0, 5, 0},
   *         rotation = {90, 0, 0},
   *         scale    = {1, 1, 1},
   *     }
   *     Global.addDecal(params)
   * end
   */
  addDecal(parameters: Decal): boolean;

  /**
   * Used to call a Lua function on another entity.
   * 
   * Var is only returned if the function called has a return. Otherwise return is nil. See example.
   * 
   * > This function can also be used directly on the game world using Global.
   * @param func_name Function name you want to activate.
   * @param func_params A Table containing any data you want to pass to that function. Optional, will not be sent by default.
   * @example
   * -- Call, used from an entity's script
   * params = {
   *     msg   = "Hello world!",
   *     color = {r=0.2, g=1, b=0.2},
   * }
   * -- Success would be set to true by the return value in the function
   * success = Global.call("testFunc", params)
   * 
   * -- Function in Global
   * function testFunc(params)
   *     broadcastToAll(params.msg, params.color)
   *     return true
   * end
   */
  call(func_name: string, func_params?: unknown[]): unknown; // TODO: Is there a way to use a generic here to get the actual fn's arg/return type?

  /**
   * Returns a table of sub-tables, each sub-table representing one decal.
   * 
   * @returns Sub-table elements
   * 
   *  - parameters.name: The name of the decal being placed.
   *  - parameters.url: The file path or URL for the image to be displayed.
   *  - parameters.position: Position to place Object.
   *  - parameters.rotation: Rotation of the Object.
   *  - parameters.scale: How the image is scaled. 1 is normal scale, 0.5 would be half sized, 2 would be twice as large, etc.
   * @example Example returned table:
   * 
   * 
   * -- If this object had 2 of the same decal on it
   * decalTable = self.getDecals()
   * 
   * --[[ This is what the table would look like
   * {
   *     {
   *         name     = "API Icon",
   *         url      = "https://api.tabletopsimulator.com/img/TSIcon.png",
   *         position = {0, 5, 0},
   *         rotation = {90, 0, 0},
   *         scale    = {5, 5, 5}
   *     },
   *     {
   *         name     = "API Icon",
   *         url      = "https://api.tabletopsimulator.com/img/TSIcon.png",
   *         position = {0, 5, 0},
   *         rotation = {90, 0, 0},
   *         scale    = {5, 5, 5}
   *     },
   * }
   * ]]--
   * 
   * -- Accessing the name of of the second entry would look like this
   * print(decalTable[2].name)
   */
  getDecals(): Decal[];

  /**
   * Get a Lua script as a string from the entity.
   */
  getLuaScript(): string;

  /**
   * Returns a table representing a list of snap points.
   * 
   * Tip
   * ---
   * This function may be called on Global in order to return a list of global snap points (i.e. snap points on the table).
   * 
   * @returns
   * The returned value is a list (numerically indexed table) of sub-tables, where each sub-table represents a snap point and has the following properties:
   * 
   * - position	Local Position of the snap point. When attached to an object, position is relative to the object's center.
   * - rotation	Local Rotation of the snap point. When attached to an object, rotation is relative to the object's rotation.
   * - rotation_snap Whether the snap point is a rotation snap point.
   * - tags Table of string representing the tags associated with the snap point.
   * @example
   * Log the list of global snap points:
   * 
   * log(Global.getSnapPoints())
   */
  getSnapPoints(): SnapPoint[];

  /**
   * Data value of a variable in another Object's script. Can only return a table.
   * @param table_name 
   */
  getTable(table_name: string): unknown;

  /**
   * Data value of a variable in another entity's script. Cannot return a table.
   * @param var_name 
   */
  getVar(var_name: string): unknown;

  /**
   * Returns Table of data representing the current Vector Lines on this entity. See setVectorLines for table format.
   */
  getVectorLines(): VectorLine[];

  /**
   * Sets which decals are on an object. This removes other decals already present, and can remove all decals as well.
   * 
   * Removing decals
   * ---
   * Using this function with an empty table will remove all decals from Global or the object it is used on. Global.setDecals({})
   * 
   * @param parameters The main table, which will contain all of the sub-tables.
   *  - subtable: The sub-table containing each individual decal's information. The sub-tables are unnamed.
   *    - parameters.subtable.name: The name of the decal being placed.
   *    - parameters.subtable.url: The file path or URL for the image to be displayed.
   *    - parameters.subtable.position: A Vector of the position to place Object.
   *    - parameters.subtable.rotation: A Vector of the rotation of the Object.
   *    - parameters.subtable.scale: How the image is scaled. 1 is normal scale, 0.5 would be half sized, 2 would be twice as large, etc.
   * @example
   * function onLoad()
   *     local parameters = {
   *         {
   *             name     = "API Icon",
   *             url      = "https://api.tabletopsimulator.com/img/TSIcon.png",
   *             position = {-2, 5, 0},
   *             rotation = {90, 0, 0},
   *             scale    = 5,
   *         },
   *         {
   *             name     = "API Icon",
   *             url      = "https://api.tabletopsimulator.com/img/TSIcon.png",
   *             position = {2, 5, 0},
   *             rotation = {90, 0, 0},
   *             scale    = 5,
   *         },
   *     }
   * 
   *     Global.setDecals(parameters)
   * end
   */
  setDecals(parameters: Decal[]): boolean;

  /**
   * Input a string as an entity's Lua script. Generally only used after spawning a new Object.
   * @param script 
   */
  setLuaScript(script: string): boolean;

  /**
   * Replaces existing snap points with the specified list of snap points.
   * 
   * Tip
   * --
   * This function can also be called on Global in order to create snap points directly within the scene, which are not attached to any other Object.
   * 
   * @param snap_points A list (numerically indexed table) of snap points.
   * snap_points must be provided as a list (numerically indexed table) of sub-tables, where each sub-table represents a snap point and may have the following properties:
   * 
   * position		{0, 0, 0}	Local Position of the snap point. When attached to an object, position is relative to the object's center.
   * rotation		{0, 0, 0}	Local Rotation of the snap point. When attached to an object, rotation is relative to the object's rotation.
   * rotation_snap		false	Whether the snap point is a rotation snap point.
   * tags		{}	Table of  representing the tags associated with the snap point.
   * All properties are optional. When a property is omitted, it will be given the corresponding default value (above).
   * 
   * @example
   * 
   * Give an object 3 snap points. A regular snap point, a rotation snap point, and a rotation snap point with a tag.
   * 
   * object.setSnapPoints({
   *     {
   *         position = {5, 2, 5}
   *     },
   *     {
   *         position = {5, 2, 5},
   *         rotation = {0, 180, 0},
   *         rotation_snap = true
   *     },
   *     {
   *         position = {-3, 2, 0},
   *         rotation = {0, 45, 0},
   *         rotation_snap = true,
   *         tags = {"meeple"}
   *     }
   * })
   */
  setSnapPoints(snap_points: Array<Partial<SnapPoint>>): boolean;

  /**
   * Creates/updates a variable in another entity's script. Only used for tables.
   * @param func_name 
   * @param data 
   */
  setTable(func_name: string, data: unknown): boolean;

  /**
   * Creates/updates a variable in another entity's script. Cannot set a table.
   * @param func_name 
   * @param data 
   */
  setVar(func_name: string, data: unknown): boolean;

  /**
   * Spawns Vector Lines from a list of parameters.
   * 
   * > This function can also be used on the game world itself using Global.
   * 
   * @param parameters: The table containing each "line's" data. Each contiguous line has its own sub-table.
   *  - points: Table containing Vector positions for each "point" on the line.
   *  - color: Color the line will be. Optional, defaults to {1,1,1}.
   *  - thickness: How thick the line is (in Unity units). Optional, defaults to default line size (0.1).
   *  - rotation: Rotation Vector for the line to be angled. Optional, defaults to {0,0,0}.
   * @example
   * function onLoad()
   *     --Make an X above the middle of the table
   *     Global.setVectorLines({
   *         {
   *             points    = { {5,1,5}, {-5,1,-5} },
   *             color     = {1,1,1},
   *             thickness = 0.5,
   *             rotation  = {0,0,0},
   *         },
   *         {
   *             points    = { {-5,1,5}, {5,1,-5} },
   *             color     = {0,0,0},
   *             thickness = 0.5,
   *             rotation  = {0,0,0},
   *         },
   *     })
   * end
   */
  setVectorLines(parameters: Array<Optional<VectorLine, 'color' | 'thickness' | 'rotation'>>): boolean;

  UI: UI;
}

declare const Global: Global;

declare const Color: { [k in PlayerColor]: k }

/**
 * This callback is run after a user clicks the menu item added via addContextMenuItem.
 * @param player_color Player Color who selected the menu item.
 * @param menu_position Global position of the right-click context menu.
 */
type ContextMenuToRunFunc = (
  player_color: PlayerColor,
  menu_position: Vector
) => unknown;

/**
 * Adds a menu item to the Global right-click context menu. Global menu is shown when player right-clicks on empty space or table.
 * @param label Label for the menu item.
 * @param toRunFunc Execute if menu item is selected.
 * @param keep_open Keep context menu open after menu item was selected. Optional, Default: keep_open = false. Close context menu after selection.
 * @param require_table Show added menu item when right-clicked on empty space or table. Optional, Default: require_table = false. Show when right-clicked on empty space or table
 * @example
 * function onLoad()
 *     addContextMenuItem("doStuff", itemAction)
 * end
 * 
 * function itemAction(player_color, menu_position)
 *     print(player_color)
 * end
 */
declare function addContextMenuItem(
  label: string,
  toRunFunc: ContextMenuToRunFunc,
  keep_open?: boolean,
  require_table?: boolean
): boolean;

/** Clears all menu items added by function addContextMenuItem. */
declare function clearContextMenu(): boolean;

/**
 * Copy a list of Objects to the clipboard. Works with paste.
 * @param object_list A Table of in-game objects to be copied. This is similar to highlighting the objects in-game and copying them.
 * @example
 * object_list = {
 *     getObjectFromGUID("######"),
 *     getObjectFromGUID("######"),
 * }
 * copy(object_list)
 */
declare function copy(object_list: TTSObject[]): boolean;

/**
 * Destroy an Object.
 * @param obj The Object you wish to delete from the instance.
 */
declare function destroyObject(obj: TTSObject): boolean;

/**
 * Flip the table.
 */
declare function flipTable(): boolean;

/**
 * @deprecated Use getObjects(). Returns a Table of all Objects in the game except hand zones.
 */
declare function getAllObjects(): TTSObject[];

/**
 * Returns Object by its GUID. Will return nil if this GUID doesn't currently exist.
 * @param guid GUID of the Object to get a reference of.
 * GUID can be obtained by right clicking an object and going to Scripting.
 * In a script, it can be obtained from any Object by using .getGUID().
 */
declare function getObjectFromGUID(guid: string): TTSObject | nil;

/**
 * Returns a Table of all Objects in the game.
 */
declare function getObjects(): TTSObject[];

/**
 * Returns Table of all Objects which have the specified tag attached.
 * @param tag
 */
declare function getObjectsWithTag(tag: string): TTSObject[];

/**
 * Returns Table of all Objects which have at least one of the specified tags attached.
 * @param tags
 */
declare function getObjectsWithAnyTags(tags: string[]): TTSObject[];

/**
 * Returns Table of all Objects which have all of the specified tags attached.
 * @param tags
 */
declare function getObjectsWithAllTags(tags: string[]): TTSObject[];

/**
 * Returns a Table of the Player Colors strings of seated players.
 */
declare function getSeatedPlayers(): PlayerColor[];

/**
 * Groups objects together, like how the G key does for players. It returns a table of object references to any decks/stacks formed.
 * Not all objects CAN be grouped. If the G key won't work on them, neither will this function.
 * @param objects A list of objects to be grouped together.
 * @returns A table containing the grouped objects, numerically indexed. Different types of object are grouped independently i.e. cards will form into a deck, each type of checker will form their own stack.
 * @example
 * -- Example
 * function onLoad()
 *     local objects = {
 *         -- IMPORTANT: To get the example to work, you need to replace ###### by a real GUID of the object.
 *         getObjectFromGUID("######"), -- card
 *         getObjectFromGUID("######"), -- card
 *         getObjectFromGUID("######"), -- checker
 *         getObjectFromGUID("######"), -- checker
 *     }
 *     local objGroupedList = group(objects)
 *     log(objGroupedList)
 * end
 */
declare function group(objects: TTSObject[]): TTSObject[];

interface PasteParams {
  position: Vector;
  snap_to_grid: boolean;
}

/**
 * Pastes Objects in-game that were copied to the in-game clipboard. Works with copy(...).
 * @param parameters A Table containing instructions of where to spawn the Objects.
 * parameters.position: Position of the first object to paste. Optional, defaults to {0, 3, 0}.
 * parameters.snap_to_grid: If snap-to-grid is active on the spawned item/s. Optional, defaults to false (off).
 */
declare function paste(parameters: PasteParams): TTSObject[];

/**
 * Enables/disables looking for group. This is visible in the server browsers, indicating if you are recruiting for a game.
 * @param lfp
 */
declare function setLookingForPlayers(lfp: boolean): boolean;

/** @noSelf */
interface SpawnObjectParams {
  type: string; // Built-in or Custom Game Object name.
  position?: Vector; // Position where the object will be spawned.
  rotation?: Vector; // Rotation of the spawned object.
  scale?: Vector; // Scale of the spawned object.
  sound?: boolean; // Whether a sound will be played as the object spawns.
  snap_to_grid?: boolean; // Whether upon spawning, the object will snap to nearby grid lines (or snap points).
  callback_function?: (obj: TTSObject) => unknown; // Called when the object has finished spawning. The spawned object will be passed as the first and only parameter.
}

/**
 * Spawns an object.
 * 
 * Refer to the spawnable Built-in Object and Custom Object pages for details about the types of objects that can be spawned.
 * 
 * If you are spawning a Custom Object, you should immediately call setCustomObject(...) on the object returned from spawnObject(...).
 * @param parameters type is mandatory, all other properties are optional. When a property is omitted, it will be given the corresponding default value (above).
 * 
 * Objects take a moment to spawn. The purpose of callback_function is to allow you to execute additional code after the object has finished spawning.
 * @example
 * local object = spawnObject({
 *     type = "rpg_BEAR",
 *     position = {0, 3, 0},
 *     scale = {2, 2, 2},
 *     sound = false,
 *     callback_function = function(spawned_object)
 *         log(spawned_object.getBounds())
 *     end
 * })
 * object.setPositionSmooth({10, 5, 10})
 */
declare function spawnObject(parameters: SpawnObjectParams): TTSObject;

/** @noSelf */
interface SpawnObjectDataParms {
  data: any; // Table with properties describing the object that will be spawned. Required content depends on the type of object being spawned.
  position?: Vector; // Position where the object will be spawned. When specified, overrides the Transform position in data.
  rotation?: Vector; // Rotation of the spawned object. When specified, overrides the Transform rotation in data.
  scale?: Vector; // Scale of the spawned object. When specified, overrides the Transform scale in data.
  callback_function?: (obj: TTSObject) => unknown; // Called when the object has finished spawning. The spawned object will be passed as the first and only parameter.
}

/**
 * Spawns an object from an object data table representation.
 * 
 * This API gives you complete control over all persistent properties that an object has.
 * @param parameters data is mandatory, all other properties are optional. When a property is omitted, it will be given the corresponding default value (above).
 * 
 * Objects take a moment to spawn. The purpose of callback_function is to allow you to execute additional code after the object has finished spawning.
 * 
 * Tip
 * ---
 * 
 * You can derive your data table from another object by calling getData() on it, and manipulating the resultant table as you see fit.
 * 
 * @example
 * local object = spawnObjectData({
 *     data = {
 *         Name = "rpg_BEAR",
 *         Transform = {
 *             posX = 0,
 *             posY = 3,
 *             posZ = 0,
 *             rotX = 0,
 *             rotY = 180,
 *             rotZ = 0,
 *             scaleX = 2,
 *             scaleY = 2,
 *             scaleZ = 2
 *         },
 *         ColorDiffuse = {
 *             r = 0.3,
 *             g = 0.5,
 *             b = 0.8
 *         }
 *     },
 *     callback_function = function(spawned_object)
 *         log(spawned_object.getBounds())
 *     end
 * })
 * object.setPositionSmooth({10, 5, 10})
 */
declare function spawnObjectData(parameters: SpawnObjectDataParms): TTSObject;

/** @noSelf */
interface SpawnObjectJSONParams {
  json: string;
  position?: Vector; // Position where the object will be spawned. When specified, overrides the Transform position in json.
  rotation?: Vector; // Rotation of the spawned object. When specified, overrides the Transform rotation in json.
  scale?: Vector; // Scale of the spawned object. When specified, overrides the Transform scale in json.
  callback_function?: (obj: TTSObject) => unknown; // Called when the object has finished spawning. The spawned object will be passed as the first and only parameter.
}

/**
 * Spawns an object from a JSON string.
 * 
 * This API gives you complete control over all persistent properties that an object has.
 * 
 * Tip
 * 
 * Unless you've already got an object's JSON representation at your disposal then spawnObjectData(...) is the preferred API as it's less resource intensive.
 * @param parameters json is mandatory, all other properties are optional. When a property is omitted, it will be given the corresponding default value (above).
 * 
 * Objects take a moment to spawn. The purpose of callback_function is to allow you to execute additional code after the object has finished spawning.
 * @example
 * local object = spawnObjectJSON({
 *     json = [[{
 *         "Name": "rpg_BEAR",
 *         "Transform": {
 *             "posX": 0,
 *             "posY": 3,
 *             "posZ": 0,
 *             "rotX": 0,
 *             "rotY": 180,
 *             "rotZ": 0,
 *             "scaleX": 2,
 *             "scaleY": 2,
 *             "scaleZ": 2
 *         },
 *         "ColorDiffuse": {
 *             "r": 0.3,
 *             "g": 0.5,
 *             "b": 0.8
 *         }
 *     }]],
 *     callback_function = function(spawned_object)
 *         log(spawned_object.getBounds())
 *     end
 * })
 * object.setPositionSmooth({10, 5, 10})
 */
declare function spawnObjectJSON(parameters: SpawnObjectJSONParams): boolean;

/**
 * Start a coroutine. A coroutine is similar to a function, but has the unique ability to have its run paused until the next frame of the game using coroutine.yield(0).
 * 
 * Attention
 * ---
 * 
 * You MUST return a 1 at the end of any coroutine or it will throw an error.
 * @param function_owner The Object that the function being called is on. Global is a valid target.
 * @param function_name Name of the function being called as a coroutine.
 * @example
 * function onLoad()
 *     startLuaCoroutine(Global, "print_coroutine")
 * end
 * 
 * -- Prints a message, waits 250 frames, prints another message
 * function print_coroutine()
 *     print("Routine has Started")
 *     count = 0
 *     while count < 250 do
 *         count = count + 1
 *         coroutine.yield(0)
 *     end
 * 
 *     print("Routine has Finished")
 * 
 *     return 1
 * end
 */
declare function startLuaCoroutine(
  function_owner: TTSObject | Global,
  function_name: string
): boolean;

/**
 * Converts a Player Color string into a Color Table for tinting.
 * @param player_color A String of a Player Color.
 * @example
 * printToAll("Blue message", stringColorToRGB("Blue"))
 */
declare function stringColorToRGB(player_color: PlayerColor): Color;

/**
 * The function that will be executed whenever the hotkey is pressed, and also when released if triggerOnKeyUp is true.
 * @param playerColor Player Color of the player that pressed the hotkey.
 * @param hoveredObject The object that the Player's pointer was hovering over at the moment the key was pressed/released. nil if no object was under the Player's pointer at the time.
 * @param pointerPosition Word Position of the Player's pointer at the moment the key was pressed/released
 * @param isKeyUp Whether this callback is being triggered in response to a hotkey being released.
 */
type AddHotkeyCallback = (
  playerColor: PlayerColor,
  hoveredObject: TTSObject,
  pointerPosition: Vector,
  isKeyUp: boolean
) => unknown;

/**
 * Adds a bindable hotkey to the game.
 * 
 * Players can bind key to hotkeys from the Options -> Game Keys UI after this function is called.
 * 
 * Important
 * ---
 * 
 * Added hotkeys are unable to persist between loads/rewinds, because the bound callback function may no longer exist. Therefore addHotkey(...) needs to be called each time the game is loaded. As long as the same labels are used, then player hotkey bindings will persist.
 * 
 * Hotkey bindings do not prevent the behavior of Settings key bindings i.e. if R (shuffle by default) is assigned as a hotkey, the hotkey callback and the default shuffle behavior will both be executed whenever R is pressed.
 * @param label A label displayed to users.
 * @param callback The function that will be executed whenever the hotkey is pressed, and also when released if triggerOnKeyUp is true.
 * @param triggerOnKeyUp Whether the callback is also executed when the hotkey is released. The callback is always triggered when the hotkey is pressed. Optional, defaults to false.
 * @example
 * addHotkey("My Hotkey", function(playerColor, object, pointerPosition, isKeyUp)
 *     local action = isKeyUp and "released" or "pressed"
 *     print(playerColor .. " " .. action .. " the hotkey")
 * end, true)
 */
declare function addHotkey(
  label: string,
  callback: AddHotkeyCallback,
  triggerOnKeyUp?: boolean
): boolean;

/**
 * Clears all hotkeys previously added via addHotkey(...).
 */
declare function clearHotkeys(): boolean;

/**
 * Shows the hotkey configuration window under Options->Game Keys.
 */
declare function showHotkeyConfig(): boolean;

/**
 * Print an on-screen message to all Players.
 * @param message Message to display on-screen.
 * @param message_tint A Table containing the RGB color tint for the text.
 * @example
 * msg = "Hello all."
 * rgb = {r=1, g=0, b=0}
 * broadcastToAll(msg, rgb)
 */
declare function broadcastToAll(message: string, message_tint?: Color): boolean;

/**
 * Print an on-screen message to a specified Player and their in-game chat.
 * @param message Message to display on-screen.
 * @param player_color Player Color to receive the message.
 * @param message_tint RGB color tint for the text.
 * @example
 * msg = "Hello White."
 * color = "White"
 * rgb = {r=1, g=0, b=0}
 * broadcastToColor(msg, color, rgb)
 */
declare function broadcastToColor(
  message: string,
  player_color: PlayerColor,
  message_tint?: Color
): boolean;

/**
 * Logs a message to the host's System Console (accessible from ~ pane of in-game chat window).
 * If value is not already a string, then it will be converted to a human-readable representation.
 * 
 * If value is a , then the table's contents (keys & values) will be displayed. The contents of nested tables will also be displayed up to a user-configurable depth.
 * 
 * Tip
 * ---
 * 
 * Table contents max depth is configurable via the log_max_table_depth System Console command.
 * 
 * As an advanced feature, multiple log tags may be provided by space-separating several tags (in the one String) provided as the tags parameter. The message style will be taken from the first tag that the user has not explicitly disabled.
 * @param value The value you want to log.
 * @param label Text to be logged before value. Optional, defaults to an empty String. Empty Strings are not displayed.
 * @param tags The log tag/style or a space separated list of log tags/styles. (See: logStyle(...)) Optional, defaults to logging with the <default> log style.
 * @example
 * log("Something happened")
 * log(getObjects())
 * log("Something unexpected happened.", "Oh no!", "error")
 */
declare function log(value: unknown, label?: string, tags?: string): boolean;

/**
 * Returns a String formatted similarly to the output of log(...).
 * If value is not already a string, then it will be converted to a human-readable representation.
 * 
 * If value is a table, then the table's contents (keys & values) will be included in the resultant String. The contents of nested tables will also be displayed up to a user-configurable depth.
 * 
 * Tip
 * ---
 * 
 * Table contents max depth is configurable via the log_max_table_depth System Console command.
 * 
 * In some circumstances log strings have newlines inserted e.g. between the label and the textual representation of value. Providing true as the value for concise will use space separators instead of newlines.
 * @param value The value you want to log.
 * @param label Text to be logged before value. Optional, defaults to an empty String. Empty Strings are not displayed.
 * @param tags The log tag/style or a space separated list of log tags/styles. Optional, defaults to logging without any tags.
 * @param concise Whether the resultant String should be generated in a more compact form (less newline characters). Optional, defaults to `false`.
 * @param displayTag Whether the specified tag(s) should be included as prefix of the resultant String. Optional, defaults to `false`.
 * @example
 * print(logString(getObjects()))
 */
declare function logString(
  value: unknown,
  label?: string,
  tags?: string,
  concise?: boolean,
  displayTag?: boolean
): string;

/**
 * Configures style options for a log(...) tag.
 * 
 * Tip
 * ---
 * 
 * Tag log styles can also be set via the System Console with the log_style_tag command.
 * @param tag A String of the log's tag.
 * @param tint RGB value to tint the log entry's text. String color will also work. Example: "Red"
 * @param prefix Text to place before this type of log entry. Optional, defaults to an empty String. Empty Strings are not displayed.
 * @param postfix Text to place after this type of log entry. Optional, defaults to an empty String. Empty Strings are not displayed.
 * @example
 * logStyle("seats", {0.5, 0.5, 0.5}, "", "End List")
 * log(Player.getAvailableColors(), nil, "seats")
 */
declare function logStyle(
  tag: string,
  tint: Color,
  prefix?: string,
  postfix?: string
): boolean;

/**
 * Print a string into chat that only the host is able to see. Used for debugging scripts.
 * @param message Text to print into the chat log.
 */
declare function print(message: string): nil;

/**
 * Print a message into the in-game chat of all connected players.
 * @param message Message to place into players' in-game chats.
 * @param message_tint RGB values for the text's color tint.
 * @example
 * printToAll("Hello World!", {r=1,g=0,b=0})
 */
declare function printToAll(message: string, message_tint: Color): boolean;

/**
 * Print a message to the in-game chat of a specific player.
 * @param message Message to place into the player's in-game chat.
 * @param player_color Player Color of the player that will receive the message.
 * @param message_tint RGB values for the text's color tint.
 * @example
 * printToColor("Hello Red.", "Red", {r=1,g=0,b=0})
 */
declare function printToColor(
  message: string,
  player_color: PlayerColor,
  message_tint: Color
): boolean;

/**
 * Send a table to your external script editor, most likely Atom. This is for custom editor functionality.
 * @param data
 */
declare function sendExternalMessage(data: any): boolean;

/** @noSelf */
declare interface JSON {
  /**
   * Value obtained from the encoded string. Can return a number, string or Table.
   * 
   * decode(json_string)
   * 
   * @param json_string A String that is decoded, generally created by encode(...) or encode_pretty(...).
   * @example
   * coded = JSON.encode("Test")
   * print(coded) --Prints "Test"
   * decoded = JSON.decode(coded)
   * print(decoded) --Prints Test
   */
  decode(json_string: string): unknown;

  /**
   * Encodes data from a number, string or Table into a JSON string.
   * 
   * encode(data)
   * 
   * @param data A Var, either String, Int, Float or Table, to encode as a string.
   */
  encode(data:unknown): string;

  /**
   * Encodes data from a number, string or Table into a JSON string. This version is slightly less efficient but is easier to read.
   * 
   * encode_pretty(data)
   * 
   * @param data A Var, either String, Int, Float or Table, to encode as a string.
   */
  encode_pretty(data: unknown): string;
}

declare var JSON: JSON;

/** @noSelf */
declare interface TTSObject extends Component, Global {
  /**
   * When non-zero, the Alt view will use the specified Euler angle to look at the object.
   */
  alt_view_angle: Vector;

  /**
   * Angular drag. Unity rigidbody property.
   */
  angular_drag: float;

  /**
   * Bounciness, value of 0-1. Unity physics material.
   */
  auto_raise: boolean;

  /**
   * Bounciness, value of 0-1. Unity physics material.
   */
  bounciness: float;

  /**
   * Drag. Unity rigidbody property.
   */
  drag: float;

  /**
   * When false, the object will not be selected by regular (click and drag) selection boxes that are drawn around the object. Players may proceed to override this behavior by holding the "Shift" modifier whilst drag selecting.
   */
  drag_selectable: boolean;

  /**
   * Dynamic friction, value of 0-1. Unity physics material.
   */
  dynamic_friction: float;

  /**
   * If grid lines can appear on the Object if visible grids are turned on.
   */
  grid_projection: boolean;

  /**
   * The 6 character unique Object identifier within Tabletop Simulator. It is assigned correctly once the spawning member variable becomes false.
   */
  guid: string;

  /**
   * The Color of the Player that is holding the object.
   */
  held_by_color: PlayerColor | "" | nil;

  /**
   * 0-23 value. Changes when a Player hits flip or alt + rotate.
   */
  held_flip_index: int;

  /**
   * Position offset from pointer.
   */
  held_position_offset: Vector;

  /**
   * When the Object collides with something while moving this is automatically enabled and reduces the movement force.
   */
  held_reduce_force: boolean;

  /**
   * Rotation offset from pointer.
   */
  held_rotation_offset: Vector;

  /**
   * 0-23 value. Changes when a Player rotates the Object.
   */
  held_spin_index: int;

  /**
   * Hide the Object when face-down as if it were in a hand zone. The face is the "top" of the Object, the direction of its positive Y coordinate. Cards/decks default to true.
   */
  hide_when_face_down: boolean;

  /**
   * Makes the object not be hidden by Fog of War.
   */
  ignore_fog_of_war: boolean;

  /**
   * If the object can be interacted with by Players. Other object will still be able to interact with it.
   */
  interactable: boolean;

  /**
   * If the Object is roughly face-down (like with cards). The face is the "top" of the Object, the direction of its positive Y coordinate. Read only.
   */
  readonly is_face_down: boolean;

  /**
   * If the Object's custom elements (images/models/etc) are loading. Read only.
   */
  readonly loading_custom: boolean;

  /**
   * If the object is frozen in place (preventing physics interactions).
   */
  locked: boolean;

  /**
   * Mass. Unity rigidbody property.
   */
  mass: float;

  /**
   * Determines the maximum number of digits which a user may type whilst hovering over the object. As soon as a player types the maximum number of digits, the corresponding behavior (e.g. onObjectNumberTyped/onNumberTyped) is triggered immediately, improving responsiveness.
   */
  max_typed_number: int;

  /**
   * Measure Tool will automatically be used when moving the Object.
   */
  measure_movement: boolean;

  /**
   * A string where you may persist user-data associated with the object. Tabletop Simulator saves this field, but otherwise does not use it. Store whatever information you see fit.
   */
  memo: string;

  /**
   * Internal resource name for this Object. Read only, and only useful for spawnObjectData(). Generally, you want getName().
   */
  readonly name: string;

  /**
   * The position the Object was picked up at. Read only.
   */
  readonly pick_up_position: Vector;

  /**
   * The rotation the Object was picked up at. Read only.
   */
  readonly pick_up_rotation: Vector;

  /**
   * If this object is a container that cannot exist with less than two contained objects (e.g. a deck), taking out the second last contained object will result in the container being destroyed. In its place the last remaining object in the container will be spawned. This variable provides a reference to the remaining object when it is being spawned. Otherwise, it's nil. Read only.
   */
  readonly remainder: TTSObject | nil;

  /**
   * If the Object is at rest. Unity rigidbody property.
   */
  resting: boolean;

  /**
   * The Lua Script on the Object.
   */
  script_code: string;

  /**
   * The saved data on the object. See onSave().
   */
  script_state: string;

  /**
   * If the Object is finished spawning. Read only.
   */
  readonly spawning: boolean;

  /**
   * Static friction, value of 0-1. Unity physics material.
   */
  static_friction: float;

  /**
   * If other Objects on top of this one are also picked up when this Object is.
   */
  sticky: boolean;

  /**
   * @deprecated
   * Use type. This object's type. Read only.
   */
  readonly tag: string;

  /**
   * 	If the tooltip opens when a pointer hovers over the object. Tooltips display name and description.
   */
  tooltip: string;

  /**
   * This object's type. Read only.
   */
  readonly type: string;

  /**
   * If gravity affects this object.
   */
  use_gravity: boolean;

  /**
   * If snapping to grid is enabled or not.
   */
  use_grid: boolean;

  /**
   * If this object can be held in a hand zone.
   */
  use_hands: boolean;

  /**
   * Switches the axis the Object rotates around when flipped.
   */
  use_rotation_value_flip: boolean;

  /**
   * If snap points are used or ignored.
   */
  use_snap_points: boolean;

  /**
   * A numeric value associated with the object, which when non-zero, will be displayed when hovering over the object. In the case of stacks, the value shown in the UI will be multiplied by the stack size i.e. you can use value to create custom stackable chips. When multiple objects are selected, values will be summed together with objects sharing overlapping object tags.
   */
  value: int;

  /**
   * @deprecated
   * Use object tags. A bit field. When objects with overlapping value_flags are selected and hovered over, their values will be summed together.
   */
  value_flags: int;

  /**
   * Adds force to an object in a directional Vector.
   * @param vector A Vector of the direction and magnitude of force.
   * @param force_type An Int representing the force type to apply. Options below.
   * Optional, defaults to 3.
   * 1. Continuous force, uses mass. (Force)
   * 2. Continuous acceleration, ignores mass. (Acceleration)
   * 3. Instant force impulse, uses mass. (Impulse)
   * 4. Instant velocity change, ignores mass. (Velocity Change)
   */
  addForce(vector: Vector, force_type?: int): boolean;

  /**
   * Adds torque to an object in a rotational Vector.
   * @param vector A Vector of the direction and magnitude of rotational force.
   * @param force_type An Int representing the force type to apply. Options below.
   * Optional, defaults to 3.
   * 1. Continuous force, uses mass. (Force)
   * 2. Continuous acceleration, ignores mass. (Acceleration)
   * 3. Instant force impulse, uses mass. (Impulse)
   * 4. Instant velocity change, ignores mass. (Velocity Change)
   */
  addTorque(vector: Vector, force_type?: int): boolean;

  /**
   * Returns a Vector of the current angular velocity.
   */
  getAngularVelocity(): Vector;

  /**
   * Returns a Table of Vector information describing the size of an object in Global terms. Bounds are part of Unity, and represent an imaginary square box that can be drawn around an object. Unlike scale, it can help indicate the size of an object in in-game units, not just relative model size.
   * 
   * Return Table
   * - center: The Vector of the center of the bounding box.
   * - size: The Vector of the size of the bounding box.
   * - offset: The Vector of the offset of the center of the bounding box from the middle of the Object model.
   */
  getBounds(): Bounds;

  /**
   * Returns a Table of Vector information describing the size of an object in Global terms, as if it was rotated to {0,0,0}. Bounds are part of Unity, and represent an imaginary square box that can be drawn around an object. Unlike scale, it can help indicate the size of an object in in-game units, not just relative model size.
   * 
   * Return Table
   * - center: The Vector of the center of the bounding box.
   * - size: The Vector of the size of the bounding box.
   * - offset: The Vector of the offset of the center of the bounding box from the middle of the Object model.
   */
  getBoundsNormalized(): Bounds;

  /**
   * Returns a Vector of the current World Position.
   */
  getPosition(): Vector;

  /**
   * Returns a Vector of the current smooth move target if the object is smooth moving, otherwise returns nil.
   */
  getPositionSmooth(): Vector | nil;

  /**
   * Returns a Vector of the current rotation.
   */
  getRotation(): Vector;

  /**
   * Returns a Vector of the current smooth rotation target if the object is smooth moving, otherwise returns nil.
   */
  getRotationSmooth(): Vector | nil;

  /**
   * Returns a Vector of the current scale. Scale is not an absolute measurement, it is a multiple of the Object's default model size. So {x=2, y=2, z=2} would be a model twice its default size, not 2 units large.
   */
  getScale(): Vector;

  /**
   * Returns a Vector of the forward direction of this Object. The direction is relative to how the object is facing.
   * @example
   * -- Example of moving forward 5 units
   * function onLoad()
   *     distance = 5
   *     pos_target = self.getTransformForward()
   *     pos_current = self.getPosition()
   *     pos = {
   *         x = pos_current.x + pos_target.x * distance,
   *         y = pos_current.y + pos_target.y * distance,
   *         z = pos_current.z + pos_target.z * distance,
   *     }
   *     self.setPositionSmooth(pos)
   * end
   */
  getTransformForward(): Vector;

  /**
   * Returns a Vector of the forward direction of this object. The direction is relative to how the object is facing.
   * @example
   * -- Example of moving right 5 units
   * function onLoad()
   *     distance = 5
   *     pos_target = self.getTransformRight()
   *     pos_current = self.getPosition()
   *     pos = {
   *         x = pos_current.x + pos_target.x * distance,
   *         y = pos_current.y + pos_target.y * distance,
   *         z = pos_current.z + pos_target.z * distance,
   *     }
   *     self.setPositionSmooth(pos)
   * end
   */
  getTransformRight(): Vector;

  /**
   * Returns a Vector of the up direction of this Object. The direction is relative to how the object is facing.
   * @example
   * -- Example of moving up 5 units
   * function onLoad()
   *     distance = 5
   *     pos_target = self.getTransformUp()
   *     pos_current = self.getPosition()
   *     pos = {
   *         x = pos_current.x + pos_target.x * distance,
   *         y = pos_current.y + pos_target.y * distance,
   *         z = pos_current.z + pos_target.z * distance,
   *     }
   *     self.setPositionSmooth(pos)
   * end
   */
  getTransformUp(): Vector;

  /**
   * Returns a Vector of the current velocity.
   */
  getVelocity(): Vector;

  /**
   * Indicates if an object is traveling as part of a Smooth move. Smooth moving is performed by setPositionSmooth and setRotationSmooth.
   */
  isSmoothMoving(): boolean;

  /**
   * Returns a Vector after converting a world vector to a local Vector. A world Vector is a positional Vector using the world's coordinate system. A Local Vector is a positional Vector that is relative to the position of the given object.
   * 
   * Object Scale
   * ---
   * 
   * This function takes the Object's scale into account, as the Object is the key relative point.
   * @param vector The world position to convert into a local position.
   */
  positionToLocal(vector: Vector): Vector;

  /**
   * Returns a Vector after converting a local Vector to a world Vector. A world Vector is a positional Vector using the world's coordinate system. A Local Vector is a positional Vector that is relative to the position of the given object.
   * 
   * Object Scale
   * ---
   * 
   * This function takes the Object's scale into account, as the Object is the key relative point.
   * @param vector The local position to convert into a world position.
   */
  positionToWorld(vector: Vector): Vector;

  /**
   * Rotates Object smoothly in the direction of the given Vector. This does not set the Object to face a specific rotation, it rotates the Object around by the number of degrees given for x/y/z.
   * @param vector The amount of x/y/z to rotate by.
   * @example
   * --Rotates object 90 degrees around its Y axis
   * self.rotate({x=0, y=90, z=0})
   */
  rotate(vector: Vector): boolean;

  /**
   * Scales Object by a multiple. This does not set the Object to a specific scale, it scales the Object by the given multiple.
   * @param vector Multiplier for scale.
   * {x=1, y=1, z=1} or 1 would not change the scale.
   * @example
   * -- Both examples work to scale an object to be twice its current scale
   * self.scale({x=2, y=2, z=2})
   * self.scale(2)
   */
  scale(vector: Vector | float): boolean;

  /**
   * Sets a Vector as the current angular velocity.
   * @param vector
   */
  setAngularVelocity(vector: Vector): boolean;

  /**
   * Instantly moves an Object to the given Vector. The Vector is interpreted as World Position.
   * @param vector
   */
  setPosition(vector: Vector): boolean;

  /**
   * Moves the Object smoothly to the given Vector.
   * @param vector A positional Vector.
   * @param collide If the Object will collide with other Objects while moving.
   * @param fast If the Object is moved quickly.
   */
  setPositionSmooth(vector: Vector, collide?: boolean, fast?: boolean): boolean;

  /**
   * Instantly rotates an Object to the given Vector.
   * @param vector
   */
  setRotation(vector: Vector): boolean;

  /**
   * Rotates the Object smoothly to the given Vector.
   * @param vector A rotational Vector.
   * @param collide If the Object will collide with other Objects while rotating.
   * @param fast If the Object is rotated quickly.
   */
  setRotationSmooth(vector: Vector, collide?: boolean, fast?: boolean): boolean;

  /**
   * Sets a Vector as the current scale.
   * @param vector
   */
  setScale(vector: Vector): boolean;

  /**
   * Sets a Vector as the current velocity.
   * @param vector
   */
  setVelocity(vector: Vector): boolean;

  /**
   * Smoothly moves Object by the given Vector offset.
   * @param vector
   */
  translate(vector: Vector): boolean;

  /**
   * Adds the specified tag to the object.
   * @param tag
   */
  addTag(tag: string): boolean;

  /**
   * Returns a table of tags (string) that have been added to the object.
   */
  getTags(): string[];

  /**
   * Returns whether the object has any tags.
   */
  hasAnyTag(): boolean;

  /**
   * Returns whether the object and the specified other object share at least one tag in common.
   * @param other
   */
  hasMatchingTag(other: TTSObject): boolean;

  /**
   * Returns whether the object has the specified tag.
   * @param tag
   */
  hasTag(tag: string): boolean;

  /**
   * Removes the specified tag from the object.
   * @param tag
   */
  removeTag(tag: string): boolean;

  /**
   * Replaces all tags on the object with those contained in the specified table (containing string).
   * @param tags
   */
  setTags(tags: string[]): boolean;

  /**
   * Removes all scripted buttons.
   */
  clearButtons(): boolean;

  /**
   * Removes all scripted inputs.
   */
  clearInputs(): boolean;

  /**
   * Creates a scripted button attached to the Object. Scripted buttons are buttons that can be clicked while in-game that trigger a function in a script.
   * 
   * Button Tips
   * ---------
   * - Buttons can not be clicked from their back side.
   * - Buttons can not be clicked if there is another object between the pointer and the button. This does not include the Object the button is attached to.
   * - Buttons are placed relative to the Object they are attached to.
   * - The maximum font size is capped at 1000.
   * - The minimum width/height is 60. Any lower number (besides 0) will appear to be 60. This prevents visual glitches involving the corner rounding.
   * - A button width/height of 0 will cause the button not to be drawn, but its label will be. This can be a way to attach text to an Object.
   * - You cannot assign an index to a button. It is given one automatically.
   * @param parameters  A Table containing the information used to spawn the button.
   * - parameters.click_function: A String of the function's name that will be run when button is clicked.
   * - parameters.function_owner: The Object which contains the click_function function. Optional, Defaults to Global.
   * - parameters.label: Text that appears on the button. Optional, defaults to an empty string.
   * - parameters.position: Where the button appears, relative to the Object's center. Optional, defaults to {x=0, y=0, z=0}.
   * - parameters.rotation: How the button is rotated, relative to the Object's rotation. Optional, defaults to {x=0, y=0, z=0}.
   * - parameters.scale: Scale of the button, relative to the Object's scale. Optional, defaults to {x=1, y=1, z=1}.
   * - parameters.width: How wide the button will be, relative to the Object. Optional, defaults to 100.
   * - parameters.height: How tall the button will be, relative to the Object. Optional, defaults to 100.
   * - parameters.font_size: Size the label font will be, relative to the Object. Optional, defaults to 100.
   * - parameters.color: A Color for the clickable button. Optional, defaults to {r=1, g=1, b=1}.
   * - parameters.font_color: A Color for the label text. Optional, defaults to {r=0, g=0, b=0}.
   * - parameters.hover_color: A Color for the background during mouse-over. Optional.
   * - parameters.press_color: A Color for the background when clicked. Optional.
   * - parameters.tooltip: Popup of text, similar to how an Object's name is displayed on mouseover. Optional, defaults to an empty string.
   * @example
   * function onLoad()
   *     params = {
   *         click_function = "click_func",
   *         function_owner = self,
   *         label          = "Test",
   *         position       = {0, 1, 0},
   *         rotation       = {0, 180, 0},
   *         width          = 800,
   *         height         = 400,
   *         font_size      = 340,
   *         color          = {0.5, 0.5, 0.5},
   *         font_color     = {1, 1, 1},
   *         tooltip        = "This text appears on mouseover.",
   *     }
   *     self.createButton(params)
   * end
   * 
   * function click_func(obj, color, alt_click)
   *     print(obj)
   *     print(color)
   *     print(alt_click)
   * end
   */
  createButton(parameters: {
    click_function: string;
    function_owner?: TTSObject | Global;
    label?: string;
    position?: Vector;
    rotation?: Vector;
    scale?: Vector;
    width?: float;
    height?: float;
    font_size?: float;
    color?: Color;
    font_color?: Color;
    hover_color?: Color;
    press_color?: Color;
    tooltip?: string;
  }): boolean;

  /**
   * Creates a scripted input attached to the Object. Scripted inputs are boxes you can click inside of in-game to input/edit text. Every letter typed triggers the function. The bool that is returned as part of the input_function allows you to determine when a player has finished editing the input.
   * 
   * Input Tips
   * -------
   * 
   * - Inputs can not be clicked from their back side.
   * - Inputs can not be clicked if there is another object between the pointer and the inputs. This does not include the Object the input is attached to.
   * - Inputs are placed relative to the Object they are attached to.
   * - The maximum font size is capped at 1000.
   * - The minimum width/height is 60. Any lower number (besides 0) will appear to be 60. This prevents visual glitches involving the corner rounding.
   * - Font that does not fit in the input window's width/height does NOT display. To know how much height you need for each line, the formula is (font_size * # of lines) + 23. In other words, multiply how many lines of text you want to display by your font_size and add 23. That is your height value.
   * - You cannot assign an index to an input. It is given one automatically.
   * @param parameters A Table containing the information used to spawn the input.
   * - parameters.input_function: A String of the function's name that will be run when a key is used or when it is deselected.
   * - parameters.function_owner: The Object which contains the input_function function. Optional, Defaults to Global.
   * - parameters.label: Text that appears as greyed out text when there is no value in the input. Optional, defaults to an empty string.
   * - parameters.position: Where the input appears, relative to the Object's center. Optional, defaults to {x=0, y=0, z=0}.
   * - parameters.rotation: How the input is rotated, relative to the Object's rotation. Optional, defaults to {x=0, y=0, z=0}.
   * - parameters.scale: Scale of the input, relative to the Object's scale. Optional, defaults to {x=1, y=1, z=1}.
   * - parameters.width: How wide the input will be, relative to the Object. Optional, defaults to 100.
   * - parameters.height: How tall the input will be, relative to the Object. Optional, defaults to 100.
   * - parameters.font_size: Size the label/value font will be, relative to the Object. Optional, defaults to 100.
   * - parameters.color: A Color for the input's background. Optional, defaults to {r=1, g=1, b=1}.
   * - parameters.font_color: A Color for the value text. Optional, defaults to {r=0, g=0, b=0}.
   * - parameters.tooltip: A popup of text, similar to how an Object's name is displayed on mouseover. Optional, defaults to an empty string.
   * - parameters.alignment: How text is aligned in the input box. Optional, defaults to 1.
   *   1. Automatic
   *   2. Left
   *   3. Center
   *   4. Right
   *   5. Justified
   * - parameters.value: Text entered into the input. Optional, defaults to an empty string.
   * - parameters.validation: What characters can be input into the input value field. Optional, defaults to 1.
   *   1. None
   *   2. Integer
   *   3. Float
   *   4. Alphanumeric
   *   5. Username
   *   6. Name
   * - parameters.tab: How the pressing of "tab" is handled when inputting. Optional, defaults to 1.
   *   1. None
   *   2. Select Next Input
   *   3. Indent
   * @example
   * function onLoad()
   *     self.createInput({
   *         input_function = "input_func",
   *         function_owner = self,
   *         label          = "Gold",
   *         alignment      = 4,
   *         position       = {x=0, y=1, z=0},
   *         width          = 800,
   *         height         = 300,
   *         font_size      = 323,
   *         validation     = 2,
   *     })
   * end
   * 
   * function input_func(obj, color, input, stillEditing)
   *     print(input)
   *     if not stillEditing then
   *         print("Finished editing.")
   *     end
   * end
   */
  createInput(parameters: {
    input_function: string;
    function_owner?: TTSObject | Global;
    label?: string;
    position?: Vector;
    rotation?: Vector;
    scale?: Vector;
    width?: float;
    height?: float;
    font_size?: float;
    color?: Color;
    font_color?: Color;
    tooltip?: string;
    alignment?: int;
    value?: string;
    validation?: int;
    tab?: int;
  }): boolean;

  /**
   * Modify an existing button. The only parameter that is required is the index. The rest are optional, and not using them will cause the edited button's element to remain. Indexes start at 0. The first button on any given Object has an index of 0, the next button on it has an index of 1, etc. Each Object has its own indexes.
   * @param parameters A Table containing the information used to spawn the button. All fields besides index are optional. If not used, the element will default to the element's current setting.
   * 
   * - parameters.index: Index of the button you want to edit.
   * - parameters.click_function: Function's name that will be run when button is clicked.
   * - parameters.function_owner: The Object which contains the click_function function.
   * - parameters.label: Text that appears on the button.
   * - parameters.position: Where the button appears, relative to the Object's center.
   * - parameters.rotation: How the button is rotated, relative to the Object's rotation.
   * - parameters.scale: Scale of the button, relative to the Object's scale.
   * - parameters.width: How wide the button will be, relative to the Object.
   * - parameters.height: How tall the button will be, relative to the Object.
   * - parameters.font_size: Size the label font will be, relative to the Object.
   * - parameters.color: A Color for the clickable button.
   * - parameters.font_color: A Color for the label text.
   * - parameters.hover_color: A Color for the background during mouse-over.
   * - parameters.press_color: A Color for the background when clicked.
   * - parameters.tooltip: Text of a popup of text, similar to how an Object's name is displayed on mouseover.
   * @example
   * self.editButton({index=0, label="New Label"})
   */
  editButton(parameters: {
    index: int;
    click_function?: string;
    function_owner?: TTSObject | Global;
    label?: string;
    position?: Vector;
    rotation?: Vector;
    scale?: Vector;
    width?: float;
    height?: float;
    font_size?: float;
    color?: Color;
    font_color?: Color;
    hover_color?: Color;
    press_color?: Color;
    tooltip?: string;
  }): boolean;

  /**
   * Modify an existing input. The only parameter that is required is the index. The rest are optional, and not using them will cause the edited input's element to remain. Indexes start at 0. The first input on any given Object has an index of 0, the next input on it has an index of 1, etc. Each Object has its own indexes.
   * @param parameters A Table containing the information used to spawn the input. All fields besides index are optional. If not used, the element will default to the element's current setting.
   *
   *  - parameters.index: Index of the input you want to edit.
   *  - parameters.input_function: The function's name that will be run when the input is selected.
   *  - parameters.function_owner: The Object which contains the input_function function.
   *  - parameters.label: Text that appears as greyed out text when there is no value in the input.
   *  - parameters.position: Where the input appears, relative to the Object's center.
   *  - parameters.rotation: How the input is rotated, relative to the Object's rotation.
   *  - parameters.scale: Scale of the input, relative to the Object's scale.
   *  - parameters.width: How wide the input will be, relative to the Object.
   *  - parameters.height: How tall the input will be, relative to the Object.
   *  - parameters.font_size: Size the label/value font will be, relative to the Object.
   *  - parameters.color: A Color for the input's background.
   *  - parameters.font_color: A Color for the value text.
   *  - parameters.tooltip: A popup of text, similar to how an Object's name is displayed on mouseover.
   *  - parameters.alignment: How text is aligned in the input box.
   * 1. Automatic
   * 2. Left
   * 3. Center
   * 4. Right
   * 5. Justified
   *  - parameters.value: A String of the text entered into the input.
   *  - parameters.validation: An Int which determines what characters can be input into the value.
   * 1. None
   * 2. Integer
   * 3. Float
   * 4. Alphanumeric
   * 5. Username
   * 6. Name
   *  - parameters.tab: An Int which determines how pressing tab is handled when inputting.
   * 1. None
   * 2. Select Next Input
   * 3. Indent
   * @example
   * self.editInput({index=0, value="New Value"})
   */
  editInput(parameters: {
    index: int;
    input_function?: string;
    function_owner?: TTSObject | Global;
    label?: string;
    position?: Vector;
    rotation?: Vector;
    scale?: Vector;
    width?: float;
    height?: float;
    font_size?: float;
    color?: Color;
    font_color?: Color;
    tooltip?: string;
    alignment?: int;
    value?: string;
    validation?: int;
    tab?: int;
  }): boolean;

  /**
   * Returns a Table of all buttons on this Object. The Table contains parameters tables with the same keys as seen in the createButton section, except each Table of parameters also contains an index entry. This is used to identify each button, used by editButton and removeButton.
   *
   * Indexes start at 0.
   */
  getButtons(): Button[];

  /**
   * Returns a Table of all inputs on this Object. The Table contains parameters tables with the same keys as seen in the createInput section, except each Table of parameters also contains an index entry. This is used to identify each input, used by editInput and removeInput.
   *
   * Indexes start at 0.
   */
  getInputs(): Input[];

  /**
   * Removes a specific button. Indexes start at 0. The first button on any given Object has an index of 0, the next button on it has an index of 1, etc. Each Object has its own indexes.
   * 
   * Removing an index instantly causes all other higher indexes to shift down 1.
   * @param index Button index to remove.
   */
  removeButton(index: int): boolean;

  /**
   * Removes a specific input. Indexes start at 0. The first input on any given Object has an index of 0, the next input on it has an index of 1, etc. Each Object has its own indexes.
   * 
   * Removing an index instantly causes all other higher indexes to shift down 1.
   * @param index Input index to remove.
   */
  removeInput(index: int): boolean;

  /**
   * Returns a table in the same format as getObjects() for containers.
   */
  getAttachments(): ContainerObject[];

  /**
   * Color tint.
   */
  getColorTint(): Color;

  /**
   * Returns a Table with the Custom Object information of a Custom Object. See the Custom Game Objects page for the kind of information returned.
   * 
   * Jigsaw Puzzles
   * ---
   * 
   * If you use getCustomObject() on a puzzle piece, it will also return desired_position, which is its position if the puzzle is "solved". You can use this to determine where to put the piece.
   * @example
   * -- Example returned Table for a custom token
   * {
   *     image = "SOME URL HERE",
   *     thickness = 0.2,
   *     merge_distance = 15,
   *     stackable = false,
   * }
   */
  getCustomObject(): any; // TODO

  /**
   * Returns a table data structure representation of the object. Works with spawnObjectData(...).
   */
  getData(): any; // TODO

  /**
   * Description, also shows as part of Object's tooltip.
   */
  getDescription(): string;

  /**
   * Settings impacting Fog of War being revealed. In the example returned table, these are the default values of any object.
   * 
   * Color Selection
   * ---
   * 
   * "Black" and "All" are synonymous for Fog of War. Either means that all players can see the revealed area when reveal = true.
   * @example
   * -- Example returned Table for a custom token
   * {
   *     reveal = false,
   *     color = 'All',
   *     range = 5
   * }
   */
  getFogOfWarReveal(): FogOfWarSettings;

  /**
   * Game Master Notes only visible for Player Color Black.
   */
  getGMNotes(): string;

  /**
   * String of the Object's unique identifier.
   */
  getGUID(): string;

  /**
   * Returns a JSON string representation of the object. Works with spawnObjectJSON(...).
   * @param indented indented is optional and defaults to true.
   */
  getJSON(indented?: boolean): string;

  /**
   * Returns information on any joints attached to this object. This information included the GUID of the other objects attached via the joints.
   * 
   * This function returns a table of sub-tables, each sub-table representing one joint.
   * 
   * Example of a return table of an object with 2 joints:
   * @example
   * {
   *     {
   *         type              = "Spring",
   *         joint_object_guid = "555555",
   *         collision         = false,
   *         break_force       = 1000,
   *         break_torgue      = 1000,
   *         axis              = {0,0,0},
   *         anchor            = {0,0,0},
   *         connector_anchor  = {0,0,0},
   *         motor_force       = 0,
   *         motor_velocity    = 0,
   *         motor_free_spin   = false,
   *         spring            = 50,
   *         damper            = 0.1
   *         max_distance      = 10
   *         min_distance      = 0
   *     },
   *     {
   *         type              = "Spring",
   *         joint_object_guid = "888888",
   *         collision         = false,
   *         break_force       = 1000,
   *         break_torgue      = 1000,
   *         axis              = {0,0,0},
   *         anchor            = {0,0,0},
   *         connector_anchor  = {0,0,0},
   *         motor_force       = 0,
   *         motor_velocity    = 0,
   *         motor_free_spin   = false,
   *         spring            = 50,
   *         damper            = 0.1
   *         max_distance      = 10
   *         min_distance      = 0
   *     },
   * }
   * Example of printing the first sub-table's information:
   * 
   * 
   * local jointsInfo = self.getJoints()
   * for k, v in pairs(jointsInfo[1]) do
   *     print(k, ":  ", v)
   * end
   */
  getJoints(): Joint[];

  /**
   * If the Object is locked.
   */
  getLock(): boolean;

  /**
   * Name, also shows as part of Object's tooltip.
   */
  getName(): string;

  /**
   * Returns data describing the objects contained within in the zone/bag/deck.
   * 
   * The format of the data returned depends on the kind of object.
   * 
   * Containers (Bags/Decks)¶
   * ---
   * Containers return a (numerically indexed) table consisting of sub-tables that each have the following properties:
   * 
   * - description		Description of the contained object.
   * - gm_notes		GM Notes on the contained object.
   * - guid		GUID of the contained object.
   * - index		Index of the contained object, represents the item's order in the container.
   * - lua_script		Lua script on the contained object.
   * - lua_script_state		Lua script saved state of the contained object.
   * - memo		Memo on the contained object.
   * - name		Name of the contained object. Will correspond with getName(), unless it's blank, in which case it'll be the internal resource name.
   * - nickname		Deprecated. Use name. Name of the item.
   * - tags		A table of  representing the tags on the contained object.
   * 
   * Zones
   * ---
   * Zones return a (numerically indexed) table of game Objects occupying the zone.
   * 
   * If the zone has tags, then only objects with compatible tags will occupy the zone.
   * 
   * @example
   * -- Iterate through each contained object
   * for _, containedObject in ipairs(object.getObjects()) do
   *     if containedObject.name == "Super Card" then
   *         object.takeObject({
   *             index = containedObject.index
   *         })
   *         break -- Stop iterating
   *     end
   * end
   * 
   * -- Iterate through object occupying the zone
   * for _, occupyingObject in ipairs(object.getObjects()) do
   *     if occupyingObject.type == "Card" then
   *         occupyingObject.highlightOn('Red')
   *     end
   * end
   */
  getObjects(): ContainerObject[] | TTSObject[];

  /**
   * Returns the number of objects contained within (if the Object is a bag, deck or stack), otherwise -1.
   */
  getQuantity(): int;

  /**
   * Returns the current rotationValue. Rotation values are used to give value to different rotations (like dice) and are set using scripting or the Gizmo tool. The value returned is for the rotation that is closest to being pointed "up".
   * 
   * The returned value will either be a number or a string, depending on the value that was given to that rotation.
   * @example
   * local value = self.getRotationValue()
   * print(value)
   */
  getRotationValue(): string | int;

  /**
   * Returns a Table of rotation values. Rotation values are used to give value to different rotations (like dice) based on which side is pointed "up". It works by checking all of the rotation values assigned to an object and determining which one of them is closest to pointing up, and then displaying the value associated with that rotation.
   * 
   * You can manually assign rotation values to objects using the Rotation Value Gizmo tool (in the left side Gizmo menu) or using setRotationValues(...).
   * 
   * Return Table
   * ---
   * The returned Table contains sub-Tables, each sub-Table containing these 2 key/value pairs.
   * 
   *  - value: What value is associated with a given rotation. Often a String or Int. Starting a value with a # will cause it not to show in the Object's tooltip.
   *  - rotation: Rotation of the Object that best represents the given value pointing up.
   * @example
   * -- Example returned Table for a coin
   * {
   *     {value="Heads", rotation={x=0, y=0, z=0}},
   *     {value="Tails", rotation={x=180, y=0, z=0}},
   * }
   */
  getRotationValues(): Array<{value: string | int; rotation: Vector}>;

  /**
   * Returns a table of the player colors currently selecting the object.
   */
  getSelectingPlayers(): PlayerColor[];

  /**
   * Current state ID (index) an object is in. Returns -1 if there are no other states. State ids (indexes) start at 1.
   */
  getStateId(): int;

  /**
   * Returns a Table of information on the states of an Object. Stated Objects have ids (indexes) starting with 1.
   * 
   * The returned table will NOT include data on the current state.
   * 
   * Return Table
   * ---
   * 
   * Returns a table of sub-tables. Each sub-table represents one other state.
   * 
   *  - name: Name of the item.
   *  - description: Description of the item.
   *  - guid: GUID of the item.
   *  - id: Index of the item, represents the item's order in the states.
   *  - lua_script: Any Lua scripting saved on the item.
   *  - lua_script_state: Any JSON save data on this item.
   *  - nickname: A duplicate of the "name" field. This is for backwards compatibility purposes only.
   * @example
   * -- Example returned Table
   * {
   *     {
   *         name             = "First State",
   *         description      = "",
   *         guid             = "AAA111",
   *         id               = 1,
   *         lua_script       = "",
   *         lua_script_state = "",
   *     },
   *     {
   *         name             = "Second State",
   *         description      = "",
   *         guid             = "BBB222",
   *         id               = 2,
   *         lua_script       = "",
   *         lua_script_state = "",
   *     },
   * }
   */
  getStates(): State[];

  /**
   * Returns the Object's value. This represents something different depending on the Object's type.
   * 
   * Important
   * ---
   * 
   * If the Object has rotation values, then this method will return the rotation value i.e. behave the same as getRotationValue().
   * 
   * See setValue(...) for more information.
   */
  getValue(): string | int | float;

  /**
   * Returns a list of zones that the object is currently occupying.
   * 
   * Important
   * ---
   * 
   * If the object has tags, then the object will only occupy zones with compatible tags.
   * 
   * @example
   * Print a comma separated list of GUIDs belonging to zones an object is currently occupying.
   * 
   * local guids = {}
   * 
   * for _, zone in ipairs(object.getZones()) do
   *     table.insert(guids, zone.guid)
   * end
   * 
   * if #guids > 0 then
   *     print("Object is contained within " .. table.concat(guids, ", "))
   * else
   *     print("Object is not contained within any zones")
   * end
   */
  getZones(): TTSObject[];

  /**
   * Returns true if the Object is (or will be) destroyed.
   */
  isDestroyed(): boolean;

  /**
   * Sets the Color tint.
   * @param color
   */
  setColorTint(color: Color): boolean;

  /**
   * Sets a custom Object's properties. It can be used after spawnObject or on an already existing custom Object. If used on an already existing custom Object, you must use reload on the object after setCustomObject for the changes to be displayed.
   * 
   * setCustomObject(parameters)
   * ---
   * 
   * The Table of parameters varies, depending on which type of custom Object it is. See the Custom Game Objects page for the parameters needed.
   * 
   * @example
   * -- Example of a custom token
   * params = {
   *     image = "SOME URL HERE",
   *     thickness = 0.2,
   *     merge_distance = 15,
   *     stackable = false,
   * }
   * obj.setCustomObject(params)
   * @param parameters 
   */
  setCustomObject(parameters: any): boolean; // TODO

  /**
   * Sets a description for an Object. Shows in tooltip after delay.
   * @param description 
   */
  setDescription(description: string): boolean;

  /**
   * Establish the settings and enable/disable an Object's revealing of Fog of War.
   * 
   * setFogOfWarReveal(fog_settings)
   * 
   * @param fog_settings A Table containing information on if/how this Object should reveal Fog of War.
   *  - reveal: Can the Object currently
   * If this is not used, the current setting for this Object is kept.
   *  - color: The rotation Vector of the Object that best represents the given value pointing up.
   * If this is not used, the current setting for this Object is kept.
   * "Black" means "visible to all players."
   * "All" means "visible to all players."
   *  - range: How far from the Object the reveal effect reaches (radius, inches).
   * If this is not used, the current setting for this Object is kept.
   * @example
   * -- Example of enabling reveal for all players at 3 units of radius.
   * params = {
   *     reveal = true,
   *     color  = "Black",
   *     range  = 3,
   * }
   * self.setFogOfWarReveal(params)
   */
  setFogOfWarReveal(fog_settings: FogOfWarSettings): boolean;

  /**
   * Sets Game Master Notes only visible for Player Color Black.
   * @param notes 
   */
  setGMNotes(notes: string): boolean;

  /**
   * Sets if an object is locked in place.
   * @param lock 
   */
  setLock(lock: boolean): boolean;

  /**
   * Sets a name for an Object. Shows in tooltip.
   * @param name 
   */
  setName(name: string): boolean;

  /**
   * Sets the Object's rotation value i.e. physically rotates the object.
   * 
   * The Object will be elevated (smooth moved upward), smoothly rotated to the rotation corresponding with the specified rotation_value and then released to fall back into place.
   * @param rotation_value A rotation value. Should be a int, string or float.
   * @example Rotate a die to show the value 6.
   * die.setRotationValue(6)
   */
  setRotationValue(rotation_value: int | string | float): unknown;

  /**
   * Sets rotation values of an object. Rotation values are used to give value to different rotations (like dice). It works by checking all of the rotation values assigned to an object and determining which one of them is closest to pointing up, and then displaying the value associated with that rotation.
   * @param rotation_values A Table containing Tables with the following values. 1 sub-Table per "face".
   *  - value: Value associated with the rotation. Should be a ,  or . If `value` is a string starting with "#", then it will not be displayed in the Object's tooltip.
   *  - rotation: The rotation of the Object that corresponds with the provided value.
   * @example Set the two different sides (rotations) of a coin to have the values "Heads" and "Tails".
   * self.setRotationValues({
   *     {
   *         value="Heads",
   *         rotation={x=0, y=0, z=0}
   *     },
   *     {
   *         value="Tails",
   *         rotation={x=180, y=0, z=0}
   *     },
   * })
   */
  setRotationValues(rotation_values: Array<{ value: int | string | float, rotiation: Vector }>): boolean;

  /**
   * Sets state of an Object. State ids (indexes) start at 1.
   * @param state_id 
   */
  setState(state_id: int): TTSObject;

  /**
   * Sets the Object's value. This represents something different depending on the Object's type.
   * @param value 
   */
  setValue(value: unknown): boolean;

  /**
   * The Object supplied as param is destroyed and becomes a dummy Object child.
   * @param object 
   */
  addAttachment(object: TTSObject): boolean;

  /**
   * Adds a menu item to the objects right-click context menu.
   * @param label Label for the menu item.
   * @param toRunFunc Execute if menu item is selected.
   * @param keep_open Keep context menu open after menu item was selected. Optional, Default: keep_open = false. Close context menu after selection.
   * @example
   * function onLoad()
   *     self.addContextMenuItem("doStuff", itemAction)
   * end
   * 
   * function itemAction(player_color)
   *     print(player_color)
   * end
   */
  addContextMenuItem(label: string, toRunFunc: ContextMenuFunction, keep_open?: boolean): boolean;

  /**
   * Clears all menu items added by function addContextMenuItem.
   */
  clearContextMenu(): boolean;

  /**
   * Removes a child with the given index. Use getAttachments() to find out the index property.
   * @param index 
   */
  removeAttachment(index: int): TTSObject;

  /**
   * Detaches the children of this Object. Returns a table of object references
   */
  removeAttachments(): TTSObject[];

  /**
   * Destroys an attachment with the given index.
   * @param index 
   */
  destroyAttachment(index: int): boolean;

  /**
   * Destroys all attachments.
   */
  destroyAttachments(): boolean;

  /**
   * Adds object to player's selection.
   * @param player_color 
   */
  addToPlayerSelection(player_color: PlayerColor): boolean;

  /**
   * Removes object from player's selection.
   * @param player_color 
   */
  removeFromPlayerSelection(player_color: PlayerColor): boolean;

  /**
   * Flips Object over.
   */
  flip(): boolean;

  /**
   * Copy/Paste this Object.
   * @param parameters A Table with information used when pasting.
   * - parameters.position: Where the Object is placed. Optional, defaults to {x=0, y=3, z=0}.
   * - parameters.snap_to_grid: If the Object snaps to grid. Optional, defaults to false.
   */
  clone(parameters?: { position?: Vector; snap_to_grid?: boolean }): TTSObject;

  /**
   * Cuts (splits) a deck down to a given card. In other words, it counts down from the top of the deck and makes a new deck of that size and puts the remaining cards in the other pile.
   * 
   * After the cut, the resulting decks much each have at least 2 cards. This means the parameter used must be between 2 and totalNumberOfCards - 2.
   * 
   * Important
   * ---
   * 
   * New decks take a frame to be created. This means trying to act on them immediately will not work. Use a coroutine or timer to add a delay.
   * @param count How many cards down to cut the deck. Optional, if no value is provided the deck is cut in half.
   * @returns The table that is returned
   *  1. The lower deck, containing the remaining cards in the deck.
   *  2. The upper deck, containing count number of cards.
   * @example
   * newDecks = deck.cut(5)
   * --A delay would be required here for these next two lines to work.
   * --The decks haven't been fully created yet.
   * newDecks[1].deal(1)
   * newDecks[2].deal(1)
   */
  cut(count: int): TTSObject[];

  /**
   * Deals Objects to hand zones. Will deal from decks/bags/stacks as well as individual items. If dealing an individual item to a hand zone, it is a good idea to make sure that its Member Variable for use_hands is true.
   * @param number How many to deal.
   * @param player_color The Player Color to deal to. Optional, defaults to an empty string. If not supplied, it will attempt to deal to all seated players.
   * @param index Index of hand zone to deal to. Optional, defaults to the first created hand zone.
   */
  deal(number: int, player_color?: PlayerColor, index?: int): boolean;

  /**
   * Deals from a deck to a position relative to the hand zone.
   * @param offset The x/y/z offset to deal to around the given hand zone.
   * @param flip If the card is flipped over when dealt.
   * @param player_color Hand zone Player Color to offset dealing to.
   * @example
   * -- Example of dealing 2 cards in front of the White player, face up.
   * self.dealToColorWithOffset({-2,0,5}, true, "White")
   * self.dealToColorWithOffset({ 2,0,5}, true, "White")
   */
  dealToColorWithOffset(offset: Vector, flip: boolean, player_color: PlayerColor): TTSObject;

  /**
   * Destroys Object. Allows for self.destruct().
   */
  destruct(): boolean;

  /**
   * Forces an Object, if held by a player, to be dropped.
   */
  drop(): boolean;

  /**
   * Creates a highlight around an Object. duration is optional and specified in seconds, when omitted the Object remains highlighted.
   * @param color 
   * @param duration 
   */
  highlightOn(color: Color, duration: float): boolean;

  /**
   * Removes a highlight from around an Object.
   * @param color
   */
  highlightOff(color: Color): boolean;

  /**
   * Joints objects together, in the same way the Joint tool does.
   * 
   * **Using obj.jointTo(), with no object or parameter used as arguments, will remove all joints from that Object.**
   * @param object The Object that the selected object will be jointed to.
   * @param parameters A table of parameters. Which parameters depends on the joint type. See below for more. All parameters have defaults, the same as the Joint Tool.
   * @example Example of Fixed:
   * self.jointTo(obj, {
   *     ["type"]        = "Fixed",
   *     ["collision"]   = true,
   *     ["break_force"]  = 1000.0,
   *     ["break_torgue"] = 1000.0,
   * })
   * 
   * Example of Spring:
   * self.jointTo(obj, {
   *     ["type"]        = "Spring",
   *     ["collision"]   = false,
   *     ["break_force"]  = 1000.0,
   *     ["break_torgue"] = 1000.0,
   *     ["spring"]      = 50,
   *     ["damper"]      = 0.1,
   *     ["max_distance"] = 10,
   *     ["min_distance"] = 1
   * })
   * 
   * Example of Hinge:
   * self.jointTo(obj, {
   *     ["type"]        = "Hinge",
   *     ["collision"]   = true,
   *     ["axis"]        = {1,1,1},
   *     ["anchor"]      = {1,1,1},
   *     ["break_force"]  = 1000.0,
   *     ["break_torgue"] = 1000.0,
   *     ["motor_force"]  = 100.0,
   *     ["motor_velocity"] = 10.0,
   *     ["motor_free_spin"] = true
   * })
   */
  jointTo(object: TTSObject, parameters: Omit<Joint, 'joint_object_guid'>): boolean;

  /**
   * Places an object into a container (chip stacks/bags/decks). If neither Object is a container, but they are able to be combined (like with 2 cards), then they form a deck/stack.
   * @param put_object An Object to place into the container.
   * @returns Returned Object
   * 
   * The container is returned as the Object reference. Either this is the container/deck/stack the other Object was placed into, or the deck/stack that was formed by the putObject action.
   * 
   * Putting Cards into Decks
   * ---
   * 
   * When you call this putObject() to put a card into a deck, the card goes into the end of the deck which is closest to it in Y elevation. So, if both the card and the deck are resting on the table, the card will be put at the bottom of the deck. if the card is hovering above the deck, it will be put at the top."
   * 
   * @example
   * -- Example of a script on a bag that places Object into itself
   * local obj = getObjectFromGUID("AAA111")
   * self.putObject(obj)
   */
  putObject(put_object: TTSObject): TTSObject;

  /**
   * Shuffles deck/bag, rolls dice/coin, lifts other objects into the air. Same as pressing R by default. If the optional parameter color is used, this function will trigger onObjectRandomized(), passing that player color.
   * @param color
   */
  randomize(color: PlayerColor): boolean;

  /**
   * Registers this object for Global collision events, such as onObjectCollisionEnter. Always returns true.
   * @param stay Whether we should register for onObjectCollisionStay. Stay events may negatively impact performance, only set this to true if absolutely necessary. Optional, defaults to `false`.
   */
  registerCollisions(stay?: boolean): boolean;

  /**
   * Returns Object reference of itself after it respawns itself. This function causes the Object to be deleted and respawned instantly to refresh it, so its old Object reference will no longer be valid. 
   * 
   * Most often this is used after using setCustomObject(...) to modify a custom object.
   */
  reload(): TTSObject;

  /**
   * Resets this Object. Resetting a Deck brings all the Cards back into it. Resetting a Bag clears its contents (works for both Loot and Infinite Bags).
   */
  reset(): boolean;

  /**
   * Rolls dice/coins.
   */
  roll(): boolean;

  /**
   * Shuffles/shakes up contents of a deck or bag.
   */
  shuffle(): boolean;

  /**
   * Returns an Object reference to a new state after randomly selecting and changing to one.
   */
  shuffleStates(): TTSObject;

  /**
   * Splits a deck, as evenly as possible, into a number of piles.
   * 
   * Important
   * ---
   * 
   * New decks take a frame to be created. This means trying to act on them immediately will not work. Use a coroutine or timer to add a delay.
   * @param piles How many piles to split the deck into. Optional, if no value is provided, it is split into two piles. Minimum Value: 2 Maximum Value: Number-Of-Cards-In-Deck / 2
   * @returns The number of Objects in the table is equal to the number of decks created by the split. They are ordered so any larger decks come first.
   * 
   *  The table that is returned
   *  1. The first deck created
   *  2. The second deck created
   *  3. The third deck created (etc)
   * @example
   * newDecks = deck.split(4)
   * --A delay would be required here for these next four lines to work.
   * --The decks haven't been fully created yet.
   * newDecks[1].deal(1)
   * newDecks[2].deal(1)
   * newDecks[3].deal(1)
   * newDecks[4].deal(1)
   */
  split(piles: int): TTSObject[];

  /**
   * Spreads the cards of a deck out on the table.
   * 
   * Important
   * ---
   * 
   * Cards take a frame to be created. This means trying to act on them immediately will not work. Use a coroutine or timer to add a delay.
   * 
   * @param distance How far apart should the cards be.
   * Optional, if no value is provided, they will be 0.6 inches apart.
   * Negative values will spread to the left instead of the right.
   * @returns Returned table
   * 
   * The number of Objects in the table is equal to the number of cards in the deck. They are returned in the order they were in the deck.
   * 
   *  The table that is returned
   *  1. The first card in the deck
   *  2. The second card in the deck
   *  3. The third card in the deck (etc)
   */
  spread(distance: float): TTSObject[];

  /**
   * Takes an object out of a container (bag/deck/chip stack), returning a reference to the object that was taken.
   * 
   * Objects that are taken out of a container will take one or more frames to spawn. Certain interactions (e.g. physics) will not be able to take place until the object has finished spawning.
   * 
   * @param parameters A Table of parameters used to determine how takeObject will act.
   *  parameters.position: A Vector of the position to place Object. Optional, defaults to container's position + 2 on the x axis.
   *  parameters.rotation: A Vector of the rotation of the Object. Optional, defaults to the container's rotation.
   *  parameters.flip: If the Object is flipped over. Optional, defaults to false. Only used with decks, not bags/stacks. If rotation is used, flip's Bool will be ignored.
   *  parameters.guid: GUID of the Object to take. Optional, no default. Only use index or guid, never both.
   *  parameters.index: Index of the Object to take. Optional, no default. Only use index or guid, never both.
   *  parameters.top: If an object is taken from the top (vs bottom). Optional, defaults to true.
   *  parameters.smooth: If the taken Object moves smoothly or instantly. Optional, defaults to true.
   *  parameters.callback_function: Callback which will be called when the taken object has finished spawnning. Optional, no default. This function takes a single parameter: the object that was taken.
   * 
   * Caution
   * ---
   * 
   * Certain containers only exist whilst they have more than one object contained within them (e.g. decks). Once you remove the second last object from a container, the container will be destroyed and the remaining contained object will spawn in its place. After calling takeObject(...) you can check for a remainder.
   * 
   * @xample
   * 
   * Take an object out of a container. As we take it out we'll instruct the object to smooth move (default positioning behavior) to coordinates (0, 5, 0). Additionally, we're going to add a blue highlight on the object we've taken out.
   * 
   * 
   * local takenObject = container.takeObject({
   *     position = {x = 0, y = 5, z = 0},
   * })
   * takenObject.highlightOn('Blue')
   * 
   * @example
   * Advanced example
   * 
   * Take an object out of a container, and then apply an upward force (impulse) shooting it into the air.
   * 
   * We can only apply an impulse to an object once its (underlying rigid body) has finished spawning Additionally, freshly spawned objects are frozen in place for a single frame. So we need to wait for the taken object to finish spawning (i.e. callback_function) then wait one more frame before applying the impulse.
   * 
   * 
   * container.takeObject({
   *     callback_function = function(spawnedObject)
   *         Wait.frames(function()
   *             -- We've just waited a frame, which has given the object time to unfreeze.
   *             -- However, it's also given the object time to enter another container, if
   *             -- it spawned on one. Thus, we must confirm the object is not destroyed.
   *             if not spawnedObject.isDestroyed() then
   *                 spawnedObject.addForce({0, 30, 0})
   *             end
   *         end)
   *     end,
   *     smooth = false, -- Smooth moving objects cannot have forces applied to them.
   * })
   */
  takeObject(parameters?: { position?: Vector; rotation?: Vector; flip?: boolean; guid?: string; index?: int; top?: boolean; smooth?: boolean; callback_function?: (object: TTSObject)=>unknown }): TTSObject;

  /**
   * Unregisters this object for Global collision events. Returns true if the object was previously registered, false otherwise.
   */
  unregisterCollisions(): boolean;

  /**
   * Hides the Object from the specified players, as if it were in a hand zone.
   * 
   * Using an empty table will cause the Object to remove the hiding effect.
   * 
   * Tip
   * ---
   * Just like Objects in a hand zone, the player/s the object is hidden from can still interact/move the hidden Object. It still exists to them, but is shown as a question mark or as a hidden card.
   * @param players A table containing colors to hide the Object from.
   * @example function onLoad()
   *     self.setHiddenFrom({"Blue", "White"})
   * end
   */
  setHiddenFrom(players: PlayerColor[]): boolean;

  /**
   * Hides the Object from the specified players, as if it were in a hidden zone.
   * 
   * Using an empty table will cause the Object to remove the hiding effect.
   * 
   * Tip
   * ---
   * Just like Objects in a hidden zone, the player/s the object is hidden from can still interact/move the hidden Object. It still exists to them, just invisibly so.
   * @param players A table containing colors to hide the Object from
   */
  setInvisibleTo(players: PlayerColor[]): boolean;

  /**
   * A more advanced version of setHiddenFrom(...), this function is also used to hide objects as if they were in a hand zone. It allows you to identify multiple sources of "hiding" by an ID and toggle the effect on/off easily.
   * 
   * This function is slightly more complicated to use for basic hiding, but allows for much easier hiding in complex situations.
   * 
   * Tip
   * ---
   * Just like Objects in a hand zone, the player/s the object is hidden from can still interact/move the hidden Object. It still exists to them, but is shown as a question mark or as a hidden card.
   * @param id The unique name for this hiding effect. Tip: You can use descriptive tag names like "fog" or "blindness"
   * @param hidden If the hiding effect is enabled or not.
   * @param players A table containing colors to hide the Object from. Optional, an empty table (or no table) hides for everyone.
   * @example
   * function onLoad()
   *     --Enable hide
   *     self.attachHider("hide", true, {"Blue", "White"})
   *     --Disable hide
   *     --self.attachHider("hide", false, {"Blue", "White"})
   * end
   */
  attachHider(id: string, hidden: boolean, players?: PlayerColor[]): boolean;

  /**
   * A more advanced version of setInvisibleTo(...), this function is also used to hide objects as if they were in a hidden zone. It allows you to identify multiple sources of "hiding" by an ID and toggle the effect on/off easily.
   * 
   * This function is slightly more complicated to use for basic hiding, but allows for much easier hiding in complex situations.
   * 
   * Tip
   * ---
   * Just like Objects in a hidden zone, the player/s the object is hidden from can still interact/move the hidden Object. It still exists to them, just invisibly so.
   * @param id The unique name for this hiding effect. Tip: You can use descriptive tag names like "fog" or "blindness"
   * @param hidden If the hiding effect is enabled or not.
   * @param players A table containing colors to hide the Object from. Optional, an empty table (or no table) hides for everyone.
   * @example
   * function onLoad()
   *     --Enable hide
   *     self.attachInvisibleHider("hide", true, {"Blue", "White"})
   *     --Disable hide
   *     --self.attachInvisibleHider("hide", false, {"Blue", "White"})
   * end
   */
  attachInvisibleHider(id: string, hidden: boolean, players: PlayerColor[]): boolean;
}

/** @noSelf */
declare interface UI {
  loading: boolean;
  getAttribute(id:string,  attribute:string): unknown; // Obtains the value of a specified attribute of a UI element.	
  getAttributes(id: string): {[key: string]: unknown }; // Returns the attributes and their values of a UI element.
  getCustomAssets(): any;	// Returns information on all custom assets uploaded to the UI ASSETS pane.
  getValue(id: string): string; // Obtains the value between elements tags, like: <Text>ValueToGet</Text>
  getXml(): string; // Returns the run-time UI's XML in string format.
  getXmlTable(): any;	// Returns the run-time UI's XML formatted as a Lua table.
  hide(id: string): boolean; // Hides the given UI element. Unlike the "active" attribute, hide triggers animations.
  setAttribute(id: string, attribute: string, value: unknown): boolean; // Sets the value of a specified attribute of a UI element.
  setAttributes(id: string, data: {[key: string]: unknown}): boolean; // Updates the value of the supplied attributes of a UI element.
  setClass(id: string, names: string): boolean; // Replaces all classes on a UI element.
  setCustomAssets(assets: any): boolean; // Sets the UI ASSETS (like custom images) for global or an Object.		
  setValue(id: string, value: string): boolean; // Updates the value between elements tags, like: <Text>ValueChanged</Text>		
  setXml(xml: string): boolean; // Replaces the run-time UI with the XML string.		
  setXmlTable(data: any): boolean; // Replaces the run-time UI with an XML string which is generated from a table of data.		
  show(id: string): boolean; // Displays the given UI element. Unlike the "active" attribute, show triggers animations.
}

/** @noSelf */
declare interface Wait {
  /**
   * Schedules a function to be executed after the specified condition has been met.
   * 
   * The return value is a unique ID that may be used to stop the scheduled function before it runs.
   * 
   * condition(toRunFunc, conditionFunc, timeout, timeoutFunc)
   * 
   * @param toRunFunc The function to be executed after the specified condition is met.
   * @param conditionFunc The function that will be executed repeatedly, until it returns true (or the timeout is reached).
   * @param timeout The amount of time (in seconds) that may elapse before the scheduled function is cancelled.
   * Optional, defaults to never timing out.
   * @param timeoutFunc The function that will be executed if the timeout is reached.
   * Optional
   * conditionFunc will be executed (possibly several times) until it returns true, at which point the scheduled function (toRunFunc) will be executed, and conditionFunc will no longer be executed again.
   * 
   * Optionally, a timeout and timeoutFunc may be specified. If conditionFunc does not return true before the specified timeout (seconds) has elapsed, then the scheduled function is cancelled i.e. will not be called. If a timeoutFunc is provided, then it will be called when the timeout is reached.
   * @example
   * Example
   * 
   * Roll a die, and wait until it comes to rest.
   * 
   * 
   * die.randomize() -- Roll a die
   * Wait.condition(
   *     function() -- Executed after our condition is met
   *         if die.isDestroyed() then
   *             print("Die was destroyed before it came to rest.")
   *         else
   *             print(die.getRotationValue() .. " was rolled.")
   *         end
   *     end,
   *     function() -- Condition function
   *         return die.isDestroyed() or die.resting
   *     end
   * )
   * Example
   * 
   * Launch an object into the air with a random impulse and wait until it comes to rest. However, if it's taking too long (more than two seconds), give up waiting.
   * 
   * 
   * local upwardImpulse = math.random(5, 25)
   * object.addForce({0, upwardImpulse, 0})
   * Wait.condition(
   *     function()
   *         if object.isDestroyed() then
   *             print("Object was destroyed before it came to rest.")
   *         else
   *             print("The object came to rest in under two seconds.")
   *         end
   *     end,
   *     function()
   *         return object.isDestroyed() or object.resting
   *     end,
   *     2, -- second timeout
   *     function() -- Executed if our timeout is reached
   *         print("Took too long to come to rest.")
   *     end
   * )
   */
  condition(toRunFunc: ()=>unknown, conditionFunc: ()=>unknown, timeout?: float, timeoutFunc?: ()=>unknown):int;

  /**
   * Schedules a function to be executed after the specified number of frames have elapsed.
   * 
   * The return value is a unique ID that may be used to stop the scheduled function before it runs.
   * 
   * frames(toRunFunc, frameCount)
   * 
   * @param toRunFunc The function to be executed after the specified number of frames have elapsed.
   * @param numberFrames The number of frames that must elapse before toRunFunc is executed.
   * Optional, defaults to `1`.
   * @example
   * Example
   * 
   * Prints "Hello!" after 60 frames have elapsed.
   * 
   * 
   * Wait.frames(
   *     function()
   *         print("Hello!")
   *     end,
   *     60
   * )
   * It's a matter of personal preference, but it's quite common to see the above compacted into one line, like:
   * 
   * Wait.frames(function() print("Hello!") end, 60)
   * Advanced Example
   * 
   * Prints "1", "2", "3", "4", "5", waiting 60 frames before each printed number.
   * 
   * Note that the scheduled function, upon execution, will reschedule itself unless count has reached 5.
   * 
   * 
   * local count = 1
   * local function printAndReschedule()
   *     print(count)
   * 
   *     if count < 5 then
   *         count = count + 1
   *         Wait.frames(printAndReschedule, 60)
   *     end
   * end
   * 
   * Wait.frames(printAndReschedule, 60)
   */
  frames(toRunFunc: ()=>unknown, numberFrames?: int):int;

  /**
   * Cancels a Wait-scheduled function.
   * 
   * stop(id)
   * 
   * @param id A wait ID (returned from Wait scheduling functions).
   * @example
   * Example
   * 
   * Schedules two functions: one that says "Hello!", and one that says "Goodbye!". However, the latter is stopped before it has a chance to execute i.e. We'll see "Hello!" printed, but we won't see "Goodbye!"
   * 
   * 
   * Wait.time(function() print("Hello!") end, 1)
   * local goodbyeId = Wait.time(function() print("Goodbye!") end, 2)
   * Wait.stop(goodbyeId)
   */
  stop(id: int): int;

  /**
   * Cancels all Wait-scheduled functions.
   * 
   * Warning
   * 
   * You should be extremely careful using this function. Generally you should cancel individual scheduled functions with stop instead.
   * 
   * Example
   * 
   * Schedules two functions: one that says "Hello!", and one that says "Goodbye!". However, both are stopped before either has the chance to execute.
   * 
   * 
   * Wait.time(function() print("Hello!") end, 1)
   * Wait.time(function() print("Goodbye!") end, 2)
   * Wait.stopAll()
   */
  stopAll():unknown;

  /**
   * Schedules a function to be executed after the specified amount of time (in seconds) has elapsed.
   * 
   * The return value is a unique ID that may be used to stop the scheduled function before it runs.
   * 
   * time(toRunFunc, seconds, repetitions)
   * 
   * @param toRunFunc The function to be executed after the specified amount of time has elapsed.
   * @param seconds The amount of time that must elapse before toRunFunc is executed.
   * @param repetitions Number of times toRunFunc will be (re)scheduled. -1 is infinite repetitions.
   * Optional, defaults to `1`.
   * repetitions is optional and defaults to 1. When repetitions is a positive number, toRunFunc will execute for the specified number of repetitions, with the specified time delay before and between each execution. When repetitions is -1, toRunFunc will be re-scheduled indefinitely (i.e. infinite repetitions).
   * @example
   * Example
   * 
   * Prints "Hello!" after 1 second has elapsed.
   * 
   * 
   * Wait.time(
   *     function()
   *         print("Hello!")
   *     end,
   *     1
   * )
   * It's a matter of personal preference, but it's quite common to see the above compacted into one line, like:
   * 
   * Wait.time(function() print("Hello!") end, 1)
   * Example
   * 
   * Prints "1", "2", "3", "4", "5", waiting 1 second before each printed number.
   * 
   * 
   * local count = 1
   * Wait.time(
   *     function()
   *         print(count)
   *         count = count + 1
   *     end,
   *     1, -- second delay
   *     5 -- repetitions
   * )
   */
  time(toRunFunc: ()=>unknown, seconds: float, repitions?: int): int;
}
declare var Wait: Wait;

//
// Event Handlers
//

/**
 * Global Script
 * 
 * Called when a saved game (and all Objects it contains) have finished loading. This includes manually loaded games/saves, as well as when a user rewinds.
 * 
 * Object Script
 * 
 * This will be called when a saved game finishes loading or when the script-owner Object has finished loading for some other reason e.g. if the script-owner Object was pulled out of a container mid-game.
 * 
 * onLoad(script_state)
 * 
 * @param script_state The previously saved script state i.e. value returned from onSave(...), or an empty string if there is no saved script state available.
 * @example
 * Example
 * 
 * Decodes a JSON representation of a game state, consisting of nested tables, strings, numbers and object GUIDs. Then obtains an Object from the saved GUID.
 * 
 * 
 * local some_object -- We'll store an object reference to use later.
 * 
 * function onLoad(script_state)
 *     -- JSON decode our saved state
 *     local state = JSON.decode(script_state)
 * 
 *     -- In this example, we're assuming the existence of some specific saved state data.
 *     local questions = state.questions -- access a nested table
 * 
 *     for _, qa in ipairs(state.questions) do
 *         print("Question: " .. qa.question)
 *         print("Answer: " .. qa.answer)
 *     end
 * 
 *     some_object = getObjectFromGUID(state.guids.some_object)
 * 
 *     -- Let's highlight some_object a random color.
 *     -- Because why not.
 * 
 *     local colors = {'Blue', 'Yellow', 'Green'}
 *     some_object.highlightOn(colors[math.random(1, 3)])
 * 
 *     return JSON.encode(state)
 * end
 * Refer to onSave(...) to see an example of how this same save state structure could be created. Subscribe to the example mod to see this in action.
 */
declare var onLoad: (script_state: string)=> unknown;

/**
 * Called when an Object starts colliding with a collision registered Object.
 * 
 * onObjectCollisionEnter(registered_object, collision_info)
 * 
 * @param registered_object The object registered to receive collision events.
 * @param collision_info A table containing data about the collision.
 * - collision_info.collision_object: Object coming into contact with registered_object.
 * - collision_info.contact_points: Table/array full of contact points, where each 3D point is represented by a (number indexed) table, not a Vector.
 * - collision_info.relative_velocity: Table (number indexed) representation of a 3D vector (but not a Vector) indicating the direction and magnitude of the collision.
 * 
 * @example
 * -- Example Usage
 * function onObjectCollisionEnter(registered_object, info)
 *     print(tostring(info.collision_object) .. " collided with " .. tostring(registered_object))
 * end
 * 
 * -- Example collision_info table
 * {
 *     collision_object = objectReference,
 *     contact_points = {
 *         {5, 0, -2}
 *     },
 *     relative_velocity = {0, 20, 0}
 * }
 */
declare var onObjectCollisionEnter: (registered_object: TTSObject, object: { collision_object: TTSObject; contact_points: any; relative_velocity: any })=>unknown;

/**
 * Called whenever an object is about to be destroyed.
 * 
 * The Object reference (object) is valid in this callback, but won't be valid next frame (as the Object will be destroyed by then).
 * 
 * This event fires immediately before the Object’s onDestroy().
 * 
 * onObjectDestroy(object)
 * 
 * @param object The object that is about to be destroyed.
 * @example
 * Example
 * 
 * Print the name of the Object which is about to be destroyed.
 * 
 * 
 * function onObjectDestroy(object)
 *     print(object.getName())
 * end
 */
declare var onObjectDestroy: (object: TTSObject)=>unknown;

/**
 * Called when an object enters a zone.
 * 
 * Important
 * 
 * Objects with tags will only enter zones with compatible tags.
 * 
 * onObjectEnterZone(zone, object)
 * 
 * @param zone Zone that was entered.
 * @param object Object that entered the zone.
 * @example
 * Example
 * 
 * Each time an object enters a zone, print the GUID of the object and the GUID of the scripting zone it entered.
 * 
 * 
 * function onObjectEnterZone(zone, object)
 *     print("Object " .. object.guid .. " entered zone " .. zone.guid)
 * end
 */
declare var onObjectEnterZone: (zone: TTSObject, object: TTSObject)=>unknown;

/**
 * Called when an object leaves a container.
 * 
 * onObjectLeaveContainer(container, object)
 * 
 * @param container Container the object left.
 * @param object Object that left the container.
 * @example
 * Example
 * 
 * Each time an object leaves a container, print the GUID of the object and the GUID of the container it left.
 * 
 * 
 * function onObjectLeaveContainer(container, object)
 *     print("Object " .. object.guid .. " left container " .. container.guid)
 * end
 */
declare var onObjectLeaveContainer: (container: TTSObject, object: TTSObject)=>unknown;

/**
 * Called when a player rotates an object.
 *
 * Warning
 * ---
 *
 * Only called in response to explicit player rotation actions. Will not be called when physics/collisions cause an object to rotate.
 *
 *  onObjectRotate(object, spin, flip, player_color, old_spin, old_flip)
 *
 * @param object The object the player is trying to rotate.
 * @param spin The object's target spin (around Y-axis) rotation in degrees within the interval [0, 360).
 * @param flip The object's target flip rotation in degrees within the interval [0, 360).
 * @param player_color Player Color of the player that performed the rotation.
 * @param old_spin The object's previous spin (around Y-axis) rotation in degrees within the interval [0, 360).
 * @param old_flip The object's previous flip rotation in degrees within the interval [0, 360).
 *  Example
 *
 *  When an object is rotated, print which player was responsible and what rotation was performed.
 *
 *  @example
 *  function onObjectRotate(object, spin, flip, player_color, old_spin, old_flip)
 *      if spin ~= old_spin then
 *          print(player_color .. " spun " .. tostring(object) .. " from " .. old_spin .. " degrees to " .. spin .. " degrees")
 *      end
 *
 *      if flip ~= old_flip then
 *          print(player_color .. " flipped " .. tostring(object) .. " from " .. old_flip .. " degrees to " .. flip .. " degrees")
 *      end
 *  end
 */
declare var onObjectRotate: (object: TTSObject, spin: float, flip: float, player_color: PlayerColor, old_spin: float, old_flip: float)=>unknown;

/**
 * Called when an object is spawned/created.
 * 
 * onObjectSpawn(object)
 * 
 * @param object Object which was spawned.
 * @example
 * function onObjectSpawn(object)
 *     print(object)
 * end
 */
declare var onObjectSpawn: (object: TTSObject)=>unknown;

/**
 * Return a .
 * 
 * This event handler provides you with an opportunity to persist your script's state, such that when a save game is loaded (or the user rewinds) the data you've persisted will be made available to onLoad(...).
 * 
 * A script's saved state is just a singular . The convention for storing complex state is to create a Lua table, JSON.encode(...) it, and return the JSON encoded string from this function.
 * 
 * Global Script
 * 
 * This event is called whenever the user manually saves game, when an auto-save is created and when a rewind checkpoint is created, by default, that's every 10 seconds. Due to the frequency at which this event handler is called, it's important that your function be fast.
 * 
 * Object Script
 * 
 * In addition to saves and rewind checkpoints, this event handler will also be called on an Object that requires its state be saved mid-game e.g. when the script-owner Object enters a container.
 * 
 * Tip
 * 
 * JSON.encode(...) has limitations with regards to what data it can encode. It cannot encode references to Objects. If you wish to encode a reference to an object, encode the Object's GUID and in onLoad(...) obtain a new Object reference via getObjectFromGUID(...).
 * 
 * Warning
 * 
 * Pressing "Save & Play" (in either the in-game Scripting Editor or Atom) does not trigger the save event.
 * 
 * In this context "Save" is referring to saving your script only. Save & Play will in fact reload your game, discarding any non-scripting changes made since the game was last (manually) loaded/saved.
 * 
 * Example
 * 
 * Returns a JSON encoding of a game state consisting of nested tables, strings, numbers and object references (encoded as GUIDs). In this example, some_object is an Object.
 * 
 * 
 * function onSave()
 *     local state = {
 *         questions = { -- nested table
 *             {
 *                 question = "What day comes after Saturday?", -- string
 *                 answer = "Sunday",
 *             },
 *             {
 *                 question = "Unknown",
 *                 answer = 42, -- number
 *             }
 *         },
 *         guids = {
 *             some_object = some_object.guid -- GUID (a string)
 *         }
 *     }
 *     return JSON.encode(state)
 * end
 * Refer to onLoad(...) to see an example of this same save state structure being loaded. Subscribe to the example mod to see this in action.
 */
declare var onSave: ()=>string;