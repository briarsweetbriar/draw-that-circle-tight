//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.17] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x2a46=['clampPlacementPosition','processWrapBreak','map\x20party','ParseArmorNotetags','convertLockColorsEscapeCharacters','_autoSizeCheck','canMove','choice','maxLines','changePaintOpacity','TightWrap','<CENTER>','CENTERPICTURE','blt','updateTransform','_autoColorActorNames','drawTextEx','getChoiceListTextAlign','STR','setupNumInput','FastForwardKey','convertMessageCoreEscapeReplacements','obtainExp','update','JSON','outlineColor','ITALIC','prototype','startY','_autoSizeRegexp','ARRAYNUM','findTargetSprite','isMessageWindowWordWrap','Game_Party_gainItem','remove','partyMemberName','levelUp','ARRAYSTRUCT','moveTo','ParseEnemyNotetags','return\x200','text','resetWordWrap','_showFast','code','processDrawCenteredPicture','setChoiceListTextAlign','ConvertTextAutoColorRegExpFriendly','_moveTargetX','<BR>','adjustShowChoiceExtension','getTextAlignment','Settings','addGeneralOptions','exit','setChoiceListMaxRows','processEscapeCharacter','setupItemChoice','changeVolume','Name','190675aOSXPD','registerResetRect','parameters','addLoadListener','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','initMessageCore','</WORDWRAP>','COMMONEVENT','_relativePosition','members','padding','faceName','follower','1367035GLwKzv','callOkHandler','TEXTALIGNMENT','updateOffsetPosition','itemRectWithPadding','postFlushTextState','_lastGainedItemData','calcMoveEasing','true','actor','clear','actorName','openness','length','processDrawPicture','activate','Window_ChoiceList_windowX','TextColor%1','calcWindowHeight','trim','processMessageCoreEscapeActions','process_VisuMZ_MessageCore_AutoColor','changeOutlineColor','FontChangeValue','Window_NameBox_refresh','slice','messageCoreTextSpeed','_list','ChoiceWindowMaxRows','Window_ChoiceList_updatePlacement','\x1bTEXTALIGNMENT[3]','SortObjectByKeyLength','battle\x20enemy','processNewLine','processCharacter','ChoiceWindowLineHeight','statusText','mainFontFace','addContinuousShowChoices','MessageCore','_dimmerSprite','AdjustRect','launchMessageCommonEvent','Skills','</I>','isArmor','getChoiceListMaxColumns','addMessageCommonEvent','_moveTargetY','windowWidth','ParseStateNotetags','height','_data','_positionType','isBreakShowTextCommands','indent','updateRelativePosition','<I>','changeTextColor','addMessageCoreTextSpeedCommand','ARRAYEVAL','boxHeight','<LINE\x20BREAK>','Game_Party_initialize','TextAlign','processFontChangeItalic','flushTextState','Scene_Boot_onDatabaseLoaded','getConfigValue','constructor','victory','isSceneBattle','rtl','_colorLock','_spriteset','lastGainedObjectQuantity','<LEFT>','Classes','followers','\x1bCOLORLOCK[1]','contents','quantity','_autoPosRegExp','Window_Options_addGeneralOptions','isWordWrapEnabled','sort','messageWidth','setWaitMode','NameBoxWindowOffsetY','currentCommand','isColorLocked','textSizeExTextAlignment','Window_Help_refresh','ActionJS','choiceRows','setupChoices','add','command101','map\x20actor','ceil','1326978URmAWF','Width','ConvertParams','textSizeEx','</LEFT>','<WORDWRAP>','format','makeFontBigger','newPage','isChoiceVisible','AddAutoColor','escapeStart','getLastGainedItemData','start','replace','convertBackslashCharacters','convertEscapeCharacters','_textDelayCount','choiceCols','startX','CreateAutoColorRegExpListEntries','TextStr','getChoiceListMaxRows','addContinuousShowTextCommands','max','NUM','_autoPositionTarget','adjustShowChoiceDefault','COLORLOCK','ParseWeaponNotetags','easeIn','_resetRect','surprise','processPxTextCode','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','MessageTextDelay','_moveTargetWidth','substring','outLineColor','processStoredAutoColorChanges','choicePositionType','processAutoPosition','scale','maxCols','contentsBack','Scene_Options_maxCommands','ParseSkillNotetags','updateMove','_MessageCoreSettings','setChoiceListLineHeight','right','_wordWrap','setMessageWindowRows','textSizeExWordWrap','Window_Message_synchronizeNameBox','convertTextMacros','\x1bITALIC[0]','_texts','Armors','updateNameBoxMove','colSpacing','choices','mainFontSize','updateAutoPosition','fontFace','EVAL','convertVariableEscapeCharacters','width','fontBold','TextColor','refreshDimmerBitmap','textCodeCheck','_messagePositionReset','return\x20\x27','resetTextColor','convertBaseEscapeCharacters','test','clearActorNameAutoColor','MessageRows','battle\x20party','nextEventCode','convertShowChoiceEscapeCodes','_wholeMoveDuration','setWordWrap','obtainItem','setMessageWindowWidth','open','map','drawBackPicture','parse','ARRAYFUNC','Game_Interpreter_setupChoices','makeFontSmaller','WAIT','<COLORLOCK>','setColorLock','match','processColorLock','isAutoColorAffected','itemLineRect','round','setup','toUpperCase','updatePlacement','_messageWindow','_textDelay','WordWrap','processAutoSize','setPositionType','isBusy','_eventId','TextCodeReplace','loadPicture','\x1bTEXTALIGNMENT[2]','_textAlignment','Window_Base_processAllText','_scene','getMessageWindowWidth','min','includes','setFaceImage','indexOf','SWITCH','Match','DISABLE','_commonEventId','setHelpWindowWordWrap','changeTextSpeed','Game_Map_updateEvents','anchor','name','Window_NameBox_updatePlacement','processPreviousColor','messageWindowRect','inBattle','type','makeData','setupEvents','<%1>','applyDatabaseAutoColor','prepareShowTextFollowups','floor','windowPadding','STRUCT','1YWicaT','isChoiceEnabled','SWITCHES','initTextAlignement','FontBiggerCap','outputWidth','processAutoColorWords','call','addMessageCoreCommands','isContinuePrepareShowTextCommands','Window_Message_terminateMessage','adjustShowChoiceCancel','gainItem','choiceTextAlign','setTextDelay','convertMessageCoreEscapeActions','itemHeight','FUNC','split','Window_Message_clearFlags','applyData','choiceLineHeight','value','innerHeight','registerActorNameAutoColorChanges','General','CreateAutoColorFor','changeValue','Window_Base_textSizeEx','makeCommandList','141201yYflMN','maxCommands','ParseItemNotetags','emerge','MessageWidth','onDatabaseLoaded','Game_Map_initialize','initialize','FontSmallerCap','getPreservedFontSettings','processCommonEvent','left','addExtraShowChoices','Window_Base_processNewLine','applyMoveEasing','defaultColor','PICTURE','ParseAllNotetags','postConvertEscapeCharacters','onProcessCharacter','returnPreservedFontSettings','obtainEscapeParam','unshift','clearCommandList','toLowerCase','_moveTargetHeight','registerCommand','_moveEasingType','center','processFsTextCode','selectDefault','Window_Base_update','process_VisuMZ_MessageCore_TextMacros','_cancelButton','moveBy','Window_Base_processEscapeCharacter','clearFlags','isVolumeSymbol','bind','convertFontSettingsEscapeCharacters','ConfigManager_makeData','\x1bC[%1]%2\x1bPREVCOLOR[0]','push','process_VisuMZ_MessageCore_TextCodes_Replace','map\x20player','databaseObjectName','splice','clamp','AddOption','updateDimensions','currencyUnit','Window_Message_newPage','ANY','obtainEscapeString','resetRect','join','</COLORLOCK>','event','ChoiceWindowTextAlign','TextCodeActions','iconIndex','_index','1gRgUjE','Window_Options_changeVolume','Game_Map_setupEvents','prepareWordWrapEscapeCharacters','onNewPageMessageCore','processTextAlignmentX','outlineWidth','default','none','Window_Base_changeTextColor','refresh','setLastGainedItemData','Items','\x1bCOLORLOCK[0]','Undefined','_nameBoxWindow','map\x20event','message','Window_Message_isTriggered','States','AutoColor','Window_Options_isVolumeSymbol','maxChoiceWidth','obtainGold','NameBoxWindowOffsetX','paintOpacity','1263539yDmBsZ','493117GFBPWP','textSpeed','stretchDimmerSprite','drawBackCenteredPicture','Actors','DefaultOutlineWidth','updateAutoSizePosition','substr','TextSpeed','setTextAlignment','easeInOut','commandName','_messageCommonEvents','</CENTER>','maxFontSizeInLine','processPyTextCode','isTriggered','list','resetPositionX','createContents','faceWidth','Window_Message_updatePlacement','setRelativePosition','fontItalic','Window_Message_processEscapeCharacter','PREVCOLOR','textCodeResult','messageWordWrap','AutoColorBypassList','makeDeepCopy','\x1bWrapBreak[0]','Rows','getChoiceListLineHeight','convertTextAlignmentEscapeCharacters','processAllText','<B>','instantTextSpeed','ARRAYSTR','drawItem','isRunning','updateEvents','</B>','preemptive','process_VisuMZ_MessageCore_TextCodes_Action','Type','preFlushTextState','lineHeight','StretchDimmedBg','terminateMessage','\x1bITALIC[1]','CreateAutoColorRegExpLists','defeat','prepareAutoSizeEscapeCharacters','_interpreter','processCustomWait','1437063QPJtRW','NameBoxWindowDefaultColor','Game_System_initialize','helpWordWrap','TextManager_message','ConfigManager_applyData','_centerMessageWindow','updateBackground','isHelpWindowWordWrap','AutoColorRegExp','index','setMessageWindowWordWrap','placeCancelButton','textColor','_moveDuration','updateMessageCommonEvents','processActorNameAutoColorChanges','innerWidth','messageCoreWindowX','battle\x20actor','normalColor','processFontChangeBold','messageRows','messagePositionReset','textSpeedStatusText','\x1bi[%1]%2','Window_Base_processControlCharacter','isCommandEnabled','drawing','synchronizeNameBox','isSceneMap','Weapons','processControlCharacter','getMessageWindowRows','fontSize','_textColorStack','preConvertEscapeCharacters','(((','createTextState','<RIGHT>','ParseClassNotetags','boxWidth','filter','isItem','\x1bTEXTALIGNMENT','TextMacros','windowX','\x1bTEXTALIGNMENT[0]','Window_Options_statusText','processTextAlignmentChange'];const _0x452c=function(_0x55231a,_0x4bef79){_0x55231a=_0x55231a-0x17c;let _0x2a467e=_0x2a46[_0x55231a];return _0x2a467e;};const _0x12ccb4=_0x452c;(function(_0x302666,_0x2e0571){const _0xec1789=_0x452c;while(!![]){try{const _0x1da3a4=parseInt(_0xec1789(0x291))+-parseInt(_0xec1789(0x29e))+parseInt(_0xec1789(0x223))+-parseInt(_0xec1789(0x1d1))*-parseInt(_0xec1789(0x193))+-parseInt(_0xec1789(0x302))*-parseInt(_0xec1789(0x392))+parseInt(_0xec1789(0x1ec))+-parseInt(_0xec1789(0x1eb));if(_0x1da3a4===_0x2e0571)break;else _0x302666['push'](_0x302666['shift']());}catch(_0x596ddb){_0x302666['push'](_0x302666['shift']());}}}(_0x2a46,0xe9ffc));var label=_0x12ccb4(0x2c5),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x12ccb4(0x24d)](function(_0x4eb052){const _0x1d4457=_0x12ccb4;return _0x4eb052['status']&&_0x4eb052['description'][_0x1d4457(0x379)]('['+label+']');})[0x0];VisuMZ[label][_0x12ccb4(0x289)]=VisuMZ[label][_0x12ccb4(0x289)]||{},VisuMZ[_0x12ccb4(0x304)]=function(_0x4c11e3,_0x59b47b){const _0x1fecd4=_0x12ccb4;for(const _0x18d99c in _0x59b47b){if(_0x18d99c[_0x1fecd4(0x362)](/(.*):(.*)/i)){const _0x5a36de=String(RegExp['$1']),_0x130074=String(RegExp['$2'])[_0x1fecd4(0x368)]()[_0x1fecd4(0x2b1)]();let _0x50c9cf,_0x3ad9ab,_0x251af1;switch(_0x130074){case _0x1fecd4(0x31b):_0x50c9cf=_0x59b47b[_0x18d99c]!==''?Number(_0x59b47b[_0x18d99c]):0x0;break;case _0x1fecd4(0x273):_0x3ad9ab=_0x59b47b[_0x18d99c]!==''?JSON[_0x1fecd4(0x35b)](_0x59b47b[_0x18d99c]):[],_0x50c9cf=_0x3ad9ab[_0x1fecd4(0x359)](_0x4ad77b=>Number(_0x4ad77b));break;case _0x1fecd4(0x343):_0x50c9cf=_0x59b47b[_0x18d99c]!==''?eval(_0x59b47b[_0x18d99c]):null;break;case _0x1fecd4(0x2da):_0x3ad9ab=_0x59b47b[_0x18d99c]!==''?JSON['parse'](_0x59b47b[_0x18d99c]):[],_0x50c9cf=_0x3ad9ab[_0x1fecd4(0x359)](_0x36869c=>eval(_0x36869c));break;case _0x1fecd4(0x26d):_0x50c9cf=_0x59b47b[_0x18d99c]!==''?JSON[_0x1fecd4(0x35b)](_0x59b47b[_0x18d99c]):'';break;case'ARRAYJSON':_0x3ad9ab=_0x59b47b[_0x18d99c]!==''?JSON[_0x1fecd4(0x35b)](_0x59b47b[_0x18d99c]):[],_0x50c9cf=_0x3ad9ab[_0x1fecd4(0x359)](_0x8739a0=>JSON[_0x1fecd4(0x35b)](_0x8739a0));break;case _0x1fecd4(0x186):_0x50c9cf=_0x59b47b[_0x18d99c]!==''?new Function(JSON['parse'](_0x59b47b[_0x18d99c])):new Function(_0x1fecd4(0x27d));break;case _0x1fecd4(0x35c):_0x3ad9ab=_0x59b47b[_0x18d99c]!==''?JSON['parse'](_0x59b47b[_0x18d99c]):[],_0x50c9cf=_0x3ad9ab['map'](_0x24352d=>new Function(JSON[_0x1fecd4(0x35b)](_0x24352d)));break;case _0x1fecd4(0x267):_0x50c9cf=_0x59b47b[_0x18d99c]!==''?String(_0x59b47b[_0x18d99c]):'';break;case _0x1fecd4(0x211):_0x3ad9ab=_0x59b47b[_0x18d99c]!==''?JSON['parse'](_0x59b47b[_0x18d99c]):[],_0x50c9cf=_0x3ad9ab[_0x1fecd4(0x359)](_0x500151=>String(_0x500151));break;case _0x1fecd4(0x391):_0x251af1=_0x59b47b[_0x18d99c]!==''?JSON[_0x1fecd4(0x35b)](_0x59b47b[_0x18d99c]):{},_0x4c11e3[_0x5a36de]={},VisuMZ['ConvertParams'](_0x4c11e3[_0x5a36de],_0x251af1);continue;case _0x1fecd4(0x27a):_0x3ad9ab=_0x59b47b[_0x18d99c]!==''?JSON[_0x1fecd4(0x35b)](_0x59b47b[_0x18d99c]):[],_0x50c9cf=_0x3ad9ab['map'](_0x3804b2=>VisuMZ[_0x1fecd4(0x304)]({},JSON[_0x1fecd4(0x35b)](_0x3804b2)));break;default:continue;}_0x4c11e3[_0x5a36de]=_0x50c9cf;}}return _0x4c11e3;},(_0x51ce2a=>{const _0xf1fa38=_0x12ccb4,_0x302329=_0x51ce2a[_0xf1fa38(0x384)];for(const _0x39ab2e of dependencies){if(!Imported[_0x39ab2e]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xf1fa38(0x308)](_0x302329,_0x39ab2e)),SceneManager['exit']();break;}}const _0x511249=_0x51ce2a['description'];if(_0x511249[_0xf1fa38(0x362)](/\[Version[ ](.*?)\]/i)){const _0x395317=Number(RegExp['$1']);_0x395317!==VisuMZ[label]['version']&&(alert(_0xf1fa38(0x295)[_0xf1fa38(0x308)](_0x302329,_0x395317)),SceneManager['exit']());}if(_0x511249[_0xf1fa38(0x362)](/\[Tier[ ](\d+)\]/i)){const _0x562d31=Number(RegExp['$1']);_0x562d31<tier?(alert(_0xf1fa38(0x324)[_0xf1fa38(0x308)](_0x302329,_0x562d31,tier)),SceneManager[_0xf1fa38(0x28b)]()):tier=Math[_0xf1fa38(0x31a)](_0x562d31,tier);}VisuMZ[_0xf1fa38(0x304)](VisuMZ[label][_0xf1fa38(0x289)],_0x51ce2a[_0xf1fa38(0x293)]);})(pluginData),PluginManager[_0x12ccb4(0x1ad)](pluginData[_0x12ccb4(0x384)],'ChoiceWindowProperties',_0x3851e0=>{const _0x280b5f=_0x12ccb4;VisuMZ[_0x280b5f(0x304)](_0x3851e0,_0x3851e0);const _0x416e4b=_0x3851e0['LineHeight']||$gameSystem['getChoiceListLineHeight']()||0x1,_0x1a2f6d=_0x3851e0['MaxRows']||$gameSystem['getChoiceListMaxRows']()||0x1,_0x345a45=_0x3851e0['MaxCols']||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x438a80=_0x3851e0[_0x280b5f(0x2de)]['toLowerCase']()||_0x280b5f(0x1d8);$gameSystem[_0x280b5f(0x333)](_0x416e4b),$gameSystem['setChoiceListMaxRows'](_0x1a2f6d),$gameSystem['setChoiceListMaxColumns'](_0x345a45),$gameSystem[_0x280b5f(0x283)](_0x438a80);}),PluginManager[_0x12ccb4(0x1ad)](pluginData[_0x12ccb4(0x384)],'MessageWindowProperties',_0x3b9ba7=>{const _0x566ee1=_0x12ccb4;VisuMZ[_0x566ee1(0x304)](_0x3b9ba7,_0x3b9ba7);const _0x58e1b8=_0x3b9ba7[_0x566ee1(0x20b)]||$gameSystem[_0x566ee1(0x244)]()||0x1,_0x1258fd=_0x3b9ba7[_0x566ee1(0x303)]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x566ee1(0x229)]=_0x3b9ba7['Center']||![];const _0x33b02b=_0x3b9ba7[_0x566ee1(0x36c)][_0x566ee1(0x1ab)]();$gameSystem[_0x566ee1(0x336)](_0x58e1b8),$gameSystem[_0x566ee1(0x357)](_0x1258fd);[_0x566ee1(0x2a6),'false'][_0x566ee1(0x379)](_0x33b02b)&&$gameSystem[_0x566ee1(0x22e)](eval(_0x33b02b));const _0x3daadd=SceneManager[_0x566ee1(0x376)][_0x566ee1(0x36a)];_0x3daadd&&(_0x3daadd['resetWordWrap'](),_0x3daadd[_0x566ee1(0x1c4)](),_0x3daadd['createContents']());}),VisuMZ['MessageCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x12ccb4(0x270)][_0x12ccb4(0x198)],Scene_Boot[_0x12ccb4(0x270)][_0x12ccb4(0x198)]=function(){const _0x1563ac=_0x12ccb4;VisuMZ[_0x1563ac(0x2c5)][_0x1563ac(0x2e1)][_0x1563ac(0x17c)](this),this[_0x1563ac(0x217)](),this[_0x1563ac(0x1be)](),this[_0x1563ac(0x1b3)](),this['process_VisuMZ_MessageCore_AutoColor']();},VisuMZ['MessageCore'][_0x12ccb4(0x2bd)]=function(_0x65972d){const _0x37c5a0=_0x12ccb4,_0x2503a2=VisuMZ['MessageCore'][_0x37c5a0(0x289)][_0x65972d];_0x2503a2[_0x37c5a0(0x2f3)]((_0x100a5f,_0x487923)=>{const _0x2a915e=_0x37c5a0;if(!_0x100a5f||!_0x487923)return-0x1;return _0x487923['Match'][_0x2a915e(0x2ab)]-_0x100a5f['Match']['length'];});},Scene_Boot[_0x12ccb4(0x270)][_0x12ccb4(0x217)]=function(){const _0x295d01=_0x12ccb4;VisuMZ[_0x295d01(0x2c5)][_0x295d01(0x2bd)](_0x295d01(0x1ce));for(const _0x41446b of VisuMZ[_0x295d01(0x2c5)]['Settings']['TextCodeActions']){_0x41446b[_0x295d01(0x37d)]=_0x41446b[_0x295d01(0x37d)][_0x295d01(0x368)](),_0x41446b[_0x295d01(0x349)]=new RegExp('\x1b'+_0x41446b['Match'],'gi'),_0x41446b[_0x295d01(0x206)]='\x1b'+_0x41446b[_0x295d01(0x37d)];if(_0x41446b[_0x295d01(0x218)]==='')_0x41446b[_0x295d01(0x206)]+='[0]';}},Scene_Boot[_0x12ccb4(0x270)]['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x3c2249=_0x12ccb4;VisuMZ[_0x3c2249(0x2c5)][_0x3c2249(0x2bd)](_0x3c2249(0x371));for(const _0x22bc6e of VisuMZ[_0x3c2249(0x2c5)][_0x3c2249(0x289)][_0x3c2249(0x371)]){_0x22bc6e[_0x3c2249(0x349)]=new RegExp('\x1b'+_0x22bc6e['Match']+_0x22bc6e[_0x3c2249(0x218)],'gi'),_0x22bc6e[_0x3c2249(0x317)]!==''&&_0x22bc6e['TextStr']!=='Undefined'?_0x22bc6e[_0x3c2249(0x206)]=new Function(_0x3c2249(0x34b)+_0x22bc6e[_0x3c2249(0x317)]['replace'](/\\/g,'\x1b')+'\x27'):_0x22bc6e[_0x3c2249(0x206)]=_0x22bc6e['TextJS'];}},Scene_Boot[_0x12ccb4(0x270)][_0x12ccb4(0x1b3)]=function(){const _0x546645=_0x12ccb4;for(const _0x172978 of VisuMZ[_0x546645(0x2c5)]['Settings'][_0x546645(0x250)]){_0x172978['textCodeCheck']=new RegExp('\x5c['+_0x172978['Match']+'\x5c]','gi'),_0x172978[_0x546645(0x317)]!==''&&_0x172978[_0x546645(0x317)]!==_0x546645(0x1df)?_0x172978['textCodeResult']=new Function(_0x546645(0x34b)+_0x172978[_0x546645(0x317)]['replace'](/\\/g,'\x1b')+'\x27'):_0x172978[_0x546645(0x206)]=_0x172978['TextJS'];}},Scene_Boot['prototype'][_0x12ccb4(0x2b3)]=function(){const _0x286384=_0x12ccb4,_0x48f731=VisuMZ[_0x286384(0x2c5)]['Settings'][_0x286384(0x1e5)];!VisuMZ[_0x286384(0x1a4)]&&(VisuMZ[_0x286384(0x2c5)][_0x286384(0x30c)]($dataClasses,_0x48f731[_0x286384(0x2eb)]),VisuMZ[_0x286384(0x2c5)]['AddAutoColor']($dataSkills,_0x48f731[_0x286384(0x2c9)]),VisuMZ['MessageCore'][_0x286384(0x30c)]($dataItems,_0x48f731[_0x286384(0x1dd)]),VisuMZ[_0x286384(0x2c5)][_0x286384(0x30c)]($dataWeapons,_0x48f731[_0x286384(0x242)]),VisuMZ[_0x286384(0x2c5)][_0x286384(0x30c)]($dataArmors,_0x48f731[_0x286384(0x33c)]),VisuMZ[_0x286384(0x2c5)][_0x286384(0x30c)]($dataEnemies,_0x48f731['Enemies']),VisuMZ['MessageCore']['AddAutoColor']($dataStates,_0x48f731['States'])),VisuMZ[_0x286384(0x2c5)]['CreateAutoColorRegExpLists']();},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x208)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x12ccb4(0x20f),_0x12ccb4(0x215),_0x12ccb4(0x2d7),_0x12ccb4(0x2ca),_0x12ccb4(0x2ea),_0x12ccb4(0x306),_0x12ccb4(0x260),_0x12ccb4(0x1f9),_0x12ccb4(0x24a),'</RIGHT>',_0x12ccb4(0x360),_0x12ccb4(0x1cb),_0x12ccb4(0x248),')))',_0x12ccb4(0x307),_0x12ccb4(0x297),_0x12ccb4(0x286),_0x12ccb4(0x2dc),_0x12ccb4(0x1a3),_0x12ccb4(0x261),'COMMONEVENT','WAIT','SHOW','HIDE','ENABLE',_0x12ccb4(0x37e),_0x12ccb4(0x37c),_0x12ccb4(0x394),'ALL',_0x12ccb4(0x1c7)],VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x30c)]=function(_0x305167,_0x35c915){const _0x3463a5=_0x12ccb4;if(_0x35c915<=0x0)return;const _0x325b67=_0x305167;for(const _0x7d4bb2 of _0x325b67){if(!_0x7d4bb2)continue;VisuMZ['MessageCore'][_0x3463a5(0x18f)](_0x7d4bb2,_0x35c915);}},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x21e)]=function(){const _0xba6fc=_0x12ccb4;VisuMZ[_0xba6fc(0x2c5)][_0xba6fc(0x22c)]=[];for(let _0x464bb8=0x1;_0x464bb8<=0x1f;_0x464bb8++){const _0x474952=_0xba6fc(0x2af)['format'](_0x464bb8),_0x31e7c3=VisuMZ[_0xba6fc(0x2c5)][_0xba6fc(0x289)][_0xba6fc(0x1e5)][_0x474952];_0x31e7c3['sort']((_0x5600af,_0xb630b4)=>{if(!_0x5600af||!_0xb630b4)return-0x1;return _0xb630b4['length']-_0x5600af['length'];}),this['CreateAutoColorRegExpListEntries'](_0x31e7c3,_0x464bb8);}},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x316)]=function(_0x36faef,_0x4a1cb2){const _0x1fb82d=_0x12ccb4;for(const _0x1726e4 of _0x36faef){if(_0x1726e4[_0x1fb82d(0x2ab)]<=0x0)continue;if(/^\d+$/['test'](_0x1726e4))continue;let _0x540c6e=VisuMZ[_0x1fb82d(0x2c5)][_0x1fb82d(0x284)](_0x1726e4);if(_0x1726e4[_0x1fb82d(0x362)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x1572d1=new RegExp(_0x540c6e,'i');else var _0x1572d1=new RegExp('\x5cb'+_0x540c6e+'\x5cb','g');VisuMZ['MessageCore']['AutoColorRegExp']['push']([_0x1572d1,'\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x4a1cb2,_0x1726e4)]);}},VisuMZ['MessageCore'][_0x12ccb4(0x284)]=function(_0x25f42a){const _0x3a55eb=_0x12ccb4;return _0x25f42a=_0x25f42a['replace'](/(\W)/gi,(_0x173ec6,_0x3433f6)=>'\x5c%1'[_0x3a55eb(0x308)](_0x3433f6)),_0x25f42a;},VisuMZ[_0x12ccb4(0x2c5)]['ParseClassNotetags']=VisuMZ[_0x12ccb4(0x24b)],VisuMZ[_0x12ccb4(0x24b)]=function(_0x599d0d){const _0x1403cb=_0x12ccb4;VisuMZ[_0x1403cb(0x2c5)][_0x1403cb(0x24b)]['call'](this,_0x599d0d);const _0x9f7130=VisuMZ[_0x1403cb(0x2c5)]['Settings']['AutoColor'];VisuMZ[_0x1403cb(0x2c5)][_0x1403cb(0x18f)](_0x599d0d,_0x9f7130['Classes']);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x330)]=VisuMZ[_0x12ccb4(0x330)],VisuMZ[_0x12ccb4(0x330)]=function(_0x248999){const _0x2f9739=_0x12ccb4;VisuMZ[_0x2f9739(0x2c5)][_0x2f9739(0x330)]['call'](this,_0x248999);const _0x337a0e=VisuMZ[_0x2f9739(0x2c5)][_0x2f9739(0x289)]['AutoColor'];VisuMZ[_0x2f9739(0x2c5)][_0x2f9739(0x18f)](_0x248999,_0x337a0e[_0x2f9739(0x2c9)]);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x195)]=VisuMZ[_0x12ccb4(0x195)],VisuMZ['ParseItemNotetags']=function(_0x4b44ad){const _0x462daa=_0x12ccb4;VisuMZ['MessageCore']['ParseItemNotetags']['call'](this,_0x4b44ad);const _0x303745=VisuMZ['MessageCore'][_0x462daa(0x289)]['AutoColor'];VisuMZ[_0x462daa(0x2c5)][_0x462daa(0x18f)](_0x4b44ad,_0x303745['Items']);},VisuMZ[_0x12ccb4(0x2c5)]['ParseWeaponNotetags']=VisuMZ[_0x12ccb4(0x31f)],VisuMZ[_0x12ccb4(0x31f)]=function(_0x3a9ca3){const _0x56f6af=_0x12ccb4;VisuMZ[_0x56f6af(0x2c5)][_0x56f6af(0x31f)]['call'](this,_0x3a9ca3);const _0x21685c=VisuMZ[_0x56f6af(0x2c5)][_0x56f6af(0x289)]['AutoColor'];VisuMZ[_0x56f6af(0x2c5)]['CreateAutoColorFor'](_0x3a9ca3,_0x21685c[_0x56f6af(0x242)]);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x258)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x12ccb4(0x258)]=function(_0x603dd4){const _0x2ff183=_0x12ccb4;VisuMZ['MessageCore'][_0x2ff183(0x258)][_0x2ff183(0x17c)](this,_0x603dd4);const _0xa75286=VisuMZ['MessageCore'][_0x2ff183(0x289)][_0x2ff183(0x1e5)];VisuMZ[_0x2ff183(0x2c5)][_0x2ff183(0x18f)](_0x603dd4,_0xa75286[_0x2ff183(0x33c)]);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x27c)]=VisuMZ[_0x12ccb4(0x27c)],VisuMZ[_0x12ccb4(0x27c)]=function(_0x3188c7){const _0x1a2973=_0x12ccb4;VisuMZ['MessageCore'][_0x1a2973(0x27c)]['call'](this,_0x3188c7);const _0xf78813=VisuMZ[_0x1a2973(0x2c5)]['Settings'][_0x1a2973(0x1e5)];VisuMZ[_0x1a2973(0x2c5)][_0x1a2973(0x18f)](_0x3188c7,_0xf78813['Enemies']);},VisuMZ[_0x12ccb4(0x2c5)]['ParseStateNotetags']=VisuMZ[_0x12ccb4(0x2d0)],VisuMZ[_0x12ccb4(0x2d0)]=function(_0x5d90c3){const _0x5c69c5=_0x12ccb4;VisuMZ[_0x5c69c5(0x2c5)][_0x5c69c5(0x2d0)]['call'](this,_0x5d90c3);const _0x5855dc=VisuMZ[_0x5c69c5(0x2c5)][_0x5c69c5(0x289)][_0x5c69c5(0x1e5)];VisuMZ['MessageCore'][_0x5c69c5(0x18f)](_0x5d90c3,_0x5855dc[_0x5c69c5(0x1e4)]);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x18f)]=function(_0x45d903,_0x50384b){const _0x2a7d13=_0x12ccb4;if(_0x50384b<=0x0)return;const _0x224294=VisuMZ[_0x2a7d13(0x2c5)]['Settings'][_0x2a7d13(0x1e5)][_0x2a7d13(0x347)+_0x50384b];let _0x17ad04=_0x45d903[_0x2a7d13(0x384)][_0x2a7d13(0x2b1)]();if(/^\d+$/['test'](_0x17ad04))return;if(VisuMZ[_0x2a7d13(0x2c5)][_0x2a7d13(0x208)][_0x2a7d13(0x379)](_0x17ad04[_0x2a7d13(0x368)]()))return;_0x17ad04=_0x17ad04[_0x2a7d13(0x310)](/\\I\[(\d+)\]/gi,''),_0x17ad04=_0x17ad04[_0x2a7d13(0x310)](/\x1bI\[(\d+)\]/gi,'');if(_0x17ad04[_0x2a7d13(0x2ab)]<=0x0)return;if(_0x17ad04[_0x2a7d13(0x362)](/-----/i))return;_0x224294[_0x2a7d13(0x1bd)](_0x17ad04);},SceneManager[_0x12ccb4(0x2e5)]=function(){const _0x555a20=_0x12ccb4;return this[_0x555a20(0x376)]&&this[_0x555a20(0x376)][_0x555a20(0x2e3)]===Scene_Battle;},SceneManager[_0x12ccb4(0x241)]=function(){const _0x3fdde2=_0x12ccb4;return this[_0x3fdde2(0x376)]&&this['_scene'][_0x3fdde2(0x2e3)]===Scene_Map;},VisuMZ[_0x12ccb4(0x2c5)]['TextManager_message']=TextManager['message'],TextManager[_0x12ccb4(0x1e2)]=function(_0x498db8){const _0x305cc0=_0x12ccb4,_0x461cb=[_0x305cc0(0x279),_0x305cc0(0x196),_0x305cc0(0x216),_0x305cc0(0x322),_0x305cc0(0x2e4),_0x305cc0(0x21f),_0x305cc0(0x30d),_0x305cc0(0x26b),_0x305cc0(0x1e8),_0x305cc0(0x356)];let _0x19858d=VisuMZ[_0x305cc0(0x2c5)][_0x305cc0(0x227)][_0x305cc0(0x17c)](this,_0x498db8);return _0x461cb['includes'](_0x498db8)&&(_0x19858d=_0x305cc0(0x297)+_0x19858d),_0x19858d;},ConfigManager[_0x12ccb4(0x1ed)]=VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x289)][_0x12ccb4(0x1f4)]['Default'],VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x1bb)]=ConfigManager[_0x12ccb4(0x38a)],ConfigManager[_0x12ccb4(0x38a)]=function(){const _0x4ed62c=_0x12ccb4,_0x715a4e=VisuMZ[_0x4ed62c(0x2c5)][_0x4ed62c(0x1bb)][_0x4ed62c(0x17c)](this);return _0x715a4e[_0x4ed62c(0x1ed)]=this[_0x4ed62c(0x1ed)],_0x715a4e;},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x228)]=ConfigManager[_0x12ccb4(0x189)],ConfigManager[_0x12ccb4(0x189)]=function(_0x583a57){const _0x3a0700=_0x12ccb4;VisuMZ['MessageCore']['ConfigManager_applyData']['call'](this,_0x583a57),_0x3a0700(0x1ed)in _0x583a57?this[_0x3a0700(0x1ed)]=Number(_0x583a57['textSpeed'])[_0x3a0700(0x1c2)](0x1,0xb):this['textSpeed']=VisuMZ[_0x3a0700(0x2c5)][_0x3a0700(0x289)]['TextSpeed']['Default'];},TextManager['messageCoreTextSpeed']=VisuMZ[_0x12ccb4(0x2c5)]['Settings']['TextSpeed'][_0x12ccb4(0x290)],TextManager[_0x12ccb4(0x210)]=VisuMZ['MessageCore'][_0x12ccb4(0x289)][_0x12ccb4(0x1f4)]['Instant'],VisuMZ['MessageCore'][_0x12ccb4(0x225)]=Game_System[_0x12ccb4(0x270)]['initialize'],Game_System['prototype'][_0x12ccb4(0x19a)]=function(){const _0x4d2c8c=_0x12ccb4;VisuMZ['MessageCore'][_0x4d2c8c(0x225)]['call'](this),this['initMessageCore']();},Game_System[_0x12ccb4(0x270)]['initMessageCore']=function(){const _0x36cfac=_0x12ccb4,_0x2eb1b8=VisuMZ['MessageCore'][_0x36cfac(0x289)][_0x36cfac(0x18e)],_0x5ed78a=VisuMZ['MessageCore'][_0x36cfac(0x289)][_0x36cfac(0x36c)];this[_0x36cfac(0x332)]={'messageRows':_0x2eb1b8[_0x36cfac(0x350)],'messageWidth':_0x2eb1b8[_0x36cfac(0x197)],'messageWordWrap':_0x5ed78a['MessageWindow'],'helpWordWrap':_0x5ed78a['HelpWindow'],'choiceLineHeight':_0x2eb1b8[_0x36cfac(0x2c1)],'choiceRows':_0x2eb1b8[_0x36cfac(0x2ba)],'choiceCols':_0x2eb1b8['ChoiceWindowMaxCols'],'choiceTextAlign':_0x2eb1b8[_0x36cfac(0x1cd)]};},Game_System['prototype'][_0x12ccb4(0x244)]=function(){const _0x1a0c9=_0x12ccb4;if(this[_0x1a0c9(0x332)]===undefined)this[_0x1a0c9(0x296)]();if(this['_MessageCoreSettings'][_0x1a0c9(0x239)]===undefined)this[_0x1a0c9(0x296)]();return this[_0x1a0c9(0x332)][_0x1a0c9(0x239)];},Game_System[_0x12ccb4(0x270)]['setMessageWindowRows']=function(_0x5f2f0e){const _0x4257dc=_0x12ccb4;if(this[_0x4257dc(0x332)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x4257dc(0x239)]===undefined)this[_0x4257dc(0x296)]();this['_MessageCoreSettings'][_0x4257dc(0x239)]=_0x5f2f0e||0x1;},Game_System['prototype'][_0x12ccb4(0x377)]=function(){const _0x10819a=_0x12ccb4;if(this[_0x10819a(0x332)]===undefined)this[_0x10819a(0x296)]();if(this[_0x10819a(0x332)][_0x10819a(0x2f4)]===undefined)this[_0x10819a(0x296)]();return this['_MessageCoreSettings'][_0x10819a(0x2f4)];},Game_System[_0x12ccb4(0x270)]['setMessageWindowWidth']=function(_0x1c9952){const _0x4692b3=_0x12ccb4;if(this['_MessageCoreSettings']===undefined)this[_0x4692b3(0x296)]();if(this[_0x4692b3(0x332)][_0x4692b3(0x2f4)]===undefined)this[_0x4692b3(0x296)]();_0x1c9952=Math[_0x4692b3(0x301)](_0x1c9952);if(_0x1c9952%0x2!==0x0)_0x1c9952+=0x1;this[_0x4692b3(0x332)]['messageWidth']=_0x1c9952||0x2;},Game_System[_0x12ccb4(0x270)][_0x12ccb4(0x275)]=function(){const _0x18edd5=_0x12ccb4;if(this[_0x18edd5(0x332)]===undefined)this['initMessageCore']();if(this[_0x18edd5(0x332)][_0x18edd5(0x207)]===undefined)this['initMessageCore']();return this[_0x18edd5(0x332)][_0x18edd5(0x207)];},Game_System[_0x12ccb4(0x270)]['setMessageWindowWordWrap']=function(_0x26c733){const _0x4c5581=_0x12ccb4;if(this[_0x4c5581(0x332)]===undefined)this[_0x4c5581(0x296)]();if(this[_0x4c5581(0x332)][_0x4c5581(0x207)]===undefined)this['initMessageCore']();this[_0x4c5581(0x332)][_0x4c5581(0x207)]=_0x26c733;},Game_System[_0x12ccb4(0x270)]['isHelpWindowWordWrap']=function(){const _0x5e812a=_0x12ccb4;if(this[_0x5e812a(0x332)]===undefined)this[_0x5e812a(0x296)]();if(this[_0x5e812a(0x332)][_0x5e812a(0x226)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings']['helpWordWrap'];},Game_System[_0x12ccb4(0x270)][_0x12ccb4(0x380)]=function(_0x12cd31){const _0x54d52c=_0x12ccb4;if(this[_0x54d52c(0x332)]===undefined)this[_0x54d52c(0x296)]();if(this['_MessageCoreSettings'][_0x54d52c(0x226)]===undefined)this[_0x54d52c(0x296)]();this['_MessageCoreSettings'][_0x54d52c(0x226)]=_0x12cd31;},Game_System['prototype'][_0x12ccb4(0x20c)]=function(){const _0x3169b4=_0x12ccb4;if(this[_0x3169b4(0x332)]===undefined)this[_0x3169b4(0x296)]();if(this[_0x3169b4(0x332)][_0x3169b4(0x18a)]===undefined)this[_0x3169b4(0x296)]();return this[_0x3169b4(0x332)][_0x3169b4(0x18a)];},Game_System['prototype'][_0x12ccb4(0x333)]=function(_0x44ca58){const _0x2ceda2=_0x12ccb4;if(this[_0x2ceda2(0x332)]===undefined)this[_0x2ceda2(0x296)]();if(this['_MessageCoreSettings'][_0x2ceda2(0x18a)]===undefined)this[_0x2ceda2(0x296)]();this[_0x2ceda2(0x332)][_0x2ceda2(0x18a)]=_0x44ca58||0x1;},Game_System[_0x12ccb4(0x270)][_0x12ccb4(0x318)]=function(){const _0x50a26d=_0x12ccb4;if(this[_0x50a26d(0x332)]===undefined)this[_0x50a26d(0x296)]();if(this[_0x50a26d(0x332)][_0x50a26d(0x2fc)]===undefined)this[_0x50a26d(0x296)]();return this[_0x50a26d(0x332)][_0x50a26d(0x2fc)];},Game_System[_0x12ccb4(0x270)][_0x12ccb4(0x28c)]=function(_0x4e49dc){const _0x538e09=_0x12ccb4;if(this[_0x538e09(0x332)]===undefined)this[_0x538e09(0x296)]();if(this[_0x538e09(0x332)][_0x538e09(0x2fc)]===undefined)this[_0x538e09(0x296)]();this['_MessageCoreSettings'][_0x538e09(0x2fc)]=_0x4e49dc||0x1;},Game_System['prototype'][_0x12ccb4(0x2cc)]=function(){const _0x43d852=_0x12ccb4;if(this[_0x43d852(0x332)]===undefined)this[_0x43d852(0x296)]();if(this[_0x43d852(0x332)]['choiceCols']===undefined)this[_0x43d852(0x296)]();return this[_0x43d852(0x332)][_0x43d852(0x314)];},Game_System['prototype']['setChoiceListMaxColumns']=function(_0xcdeb81){const _0x11dffa=_0x12ccb4;if(this['_MessageCoreSettings']===undefined)this[_0x11dffa(0x296)]();if(this[_0x11dffa(0x332)][_0x11dffa(0x314)]===undefined)this['initMessageCore']();this[_0x11dffa(0x332)][_0x11dffa(0x314)]=_0xcdeb81||0x1;},Game_System[_0x12ccb4(0x270)][_0x12ccb4(0x266)]=function(){const _0x5ab380=_0x12ccb4;if(this[_0x5ab380(0x332)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x5ab380(0x182)]===undefined)this[_0x5ab380(0x296)]();return this[_0x5ab380(0x332)][_0x5ab380(0x182)];},Game_System[_0x12ccb4(0x270)]['setChoiceListTextAlign']=function(_0x257645){const _0x43a746=_0x12ccb4;if(this[_0x43a746(0x332)]===undefined)this[_0x43a746(0x296)]();if(this['_MessageCoreSettings']['choiceTextAlign']===undefined)this[_0x43a746(0x296)]();this[_0x43a746(0x332)]['choiceTextAlign']=_0x257645[_0x43a746(0x1ab)]();},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x2dd)]=Game_Party[_0x12ccb4(0x270)]['initialize'],Game_Party[_0x12ccb4(0x270)][_0x12ccb4(0x19a)]=function(){const _0x2a1a3b=_0x12ccb4;VisuMZ[_0x2a1a3b(0x2c5)][_0x2a1a3b(0x2dd)][_0x2a1a3b(0x17c)](this),this[_0x2a1a3b(0x296)]();},Game_Party[_0x12ccb4(0x270)]['initMessageCore']=function(){const _0x56753a=_0x12ccb4;this[_0x56753a(0x2a4)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x12ccb4(0x270)]['getLastGainedItemData']=function(){const _0x2f4706=_0x12ccb4;if(this['_lastGainedItemData']===undefined)this[_0x2f4706(0x296)]();return this[_0x2f4706(0x2a4)];},Game_Party[_0x12ccb4(0x270)][_0x12ccb4(0x1dc)]=function(_0x3adb18,_0x2e655b){const _0x19e4df=_0x12ccb4;if(this[_0x19e4df(0x2a4)]===undefined)this[_0x19e4df(0x296)]();if(!_0x3adb18)return;if(DataManager[_0x19e4df(0x24e)](_0x3adb18))this[_0x19e4df(0x2a4)][_0x19e4df(0x389)]=0x0;else{if(DataManager['isWeapon'](_0x3adb18))this[_0x19e4df(0x2a4)][_0x19e4df(0x389)]=0x1;else DataManager[_0x19e4df(0x2cb)](_0x3adb18)&&(this[_0x19e4df(0x2a4)]['type']=0x2);}this[_0x19e4df(0x2a4)]['id']=_0x3adb18['id'],this[_0x19e4df(0x2a4)]['quantity']=_0x2e655b;},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x276)]=Game_Party['prototype'][_0x12ccb4(0x181)],Game_Party[_0x12ccb4(0x270)][_0x12ccb4(0x181)]=function(_0x1f1b76,_0x2abdf9,_0x1c636d){const _0x574aba=_0x12ccb4;VisuMZ['MessageCore'][_0x574aba(0x276)]['call'](this,_0x1f1b76,_0x2abdf9,_0x1c636d),_0x2abdf9>0x0&&this[_0x574aba(0x1dc)](_0x1f1b76,_0x2abdf9);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x199)]=Game_Map[_0x12ccb4(0x270)]['initialize'],Game_Map[_0x12ccb4(0x270)]['initialize']=function(){const _0x18b111=_0x12ccb4;VisuMZ[_0x18b111(0x2c5)][_0x18b111(0x199)]['call'](this),this['_messageCommonEvents']=[];},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x1d3)]=Game_Map['prototype'][_0x12ccb4(0x38b)],Game_Map[_0x12ccb4(0x270)][_0x12ccb4(0x38b)]=function(){const _0x4417fa=_0x12ccb4;VisuMZ[_0x4417fa(0x2c5)][_0x4417fa(0x1d3)]['call'](this),this[_0x4417fa(0x1f8)]=[];},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x382)]=Game_Map[_0x12ccb4(0x270)][_0x12ccb4(0x214)],Game_Map[_0x12ccb4(0x270)][_0x12ccb4(0x214)]=function(){const _0x3190d9=_0x12ccb4;VisuMZ[_0x3190d9(0x2c5)][_0x3190d9(0x382)][_0x3190d9(0x17c)](this),this['updateMessageCommonEvents']();},Game_Map[_0x12ccb4(0x270)][_0x12ccb4(0x2cd)]=function(_0x27a401){const _0x5d6836=_0x12ccb4;this[_0x5d6836(0x1f8)]=this['_messageCommonEvents']||[];const _0x49f5a7=this[_0x5d6836(0x221)][_0x5d6836(0x370)],_0x1742fc=new Game_MessageCommonEvent(_0x27a401,_0x49f5a7);this[_0x5d6836(0x1f8)][_0x5d6836(0x1bd)](_0x1742fc);},Game_Map[_0x12ccb4(0x270)][_0x12ccb4(0x232)]=function(){const _0x499d5c=_0x12ccb4;this[_0x499d5c(0x1f8)]=this[_0x499d5c(0x1f8)]||[];for(const _0x44262e of this[_0x499d5c(0x1f8)]){!_0x44262e[_0x499d5c(0x221)]?this[_0x499d5c(0x1f8)][_0x499d5c(0x277)](_0x44262e):_0x44262e[_0x499d5c(0x26c)]();}},Game_Interpreter['prototype'][_0x12ccb4(0x2ff)]=function(_0x4a9728){const _0xb1c707=_0x12ccb4;if($gameMessage[_0xb1c707(0x36f)]())return![];return this['prepareShowTextCommand'](_0x4a9728),this['addContinuousShowTextCommands'](_0x4a9728),this[_0xb1c707(0x38e)](_0x4a9728),this[_0xb1c707(0x2f5)](_0xb1c707(0x1e2)),!![];},Game_Interpreter['prototype']['prepareShowTextCommand']=function(_0x41f719){const _0x44fc18=_0x12ccb4;$gameMessage[_0x44fc18(0x37a)](_0x41f719[0x0],_0x41f719[0x1]),$gameMessage['setBackground'](_0x41f719[0x2]),$gameMessage[_0x44fc18(0x36e)](_0x41f719[0x3]),$gameMessage['setSpeakerName'](_0x41f719[0x4]);},Game_Interpreter[_0x12ccb4(0x270)][_0x12ccb4(0x319)]=function(_0xdc4de6){const _0x45aa32=_0x12ccb4;while(this[_0x45aa32(0x17e)]()){this['_index']++;this[_0x45aa32(0x2f7)]()[_0x45aa32(0x281)]===0x191&&$gameMessage[_0x45aa32(0x2fe)](this[_0x45aa32(0x2f7)]()[_0x45aa32(0x293)][0x0]);if(this[_0x45aa32(0x2d4)]())break;}},Game_Interpreter[_0x12ccb4(0x270)][_0x12ccb4(0x17e)]=function(){const _0x59d5fa=_0x12ccb4;return this['nextEventCode']()===0x65&&$gameSystem[_0x59d5fa(0x244)]()>0x4?!![]:this[_0x59d5fa(0x352)]()===0x191;},Game_Interpreter[_0x12ccb4(0x270)][_0x12ccb4(0x2d4)]=function(){const _0x538ba1=_0x12ccb4;return $gameMessage[_0x538ba1(0x33b)][_0x538ba1(0x2ab)]>=$gameSystem[_0x538ba1(0x244)]()&&this[_0x538ba1(0x352)]()!==0x191;},Game_Interpreter[_0x12ccb4(0x270)]['prepareShowTextFollowups']=function(_0x275d5b){const _0x1691a2=_0x12ccb4;switch(this[_0x1691a2(0x352)]()){case 0x66:this['_index']++,this['setupChoices'](this[_0x1691a2(0x2f7)]()[_0x1691a2(0x293)]);break;case 0x67:this[_0x1691a2(0x1d0)]++,this[_0x1691a2(0x268)](this[_0x1691a2(0x2f7)]()[_0x1691a2(0x293)]);break;case 0x68:this[_0x1691a2(0x1d0)]++,this[_0x1691a2(0x28e)](this[_0x1691a2(0x2f7)]()['parameters']);break;}},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x35d)]=Game_Interpreter['prototype'][_0x12ccb4(0x2fd)],Game_Interpreter[_0x12ccb4(0x270)][_0x12ccb4(0x2fd)]=function(_0x13031b){const _0x178d92=_0x12ccb4;_0x13031b=this['addContinuousShowChoices'](),VisuMZ[_0x178d92(0x2c5)][_0x178d92(0x35d)][_0x178d92(0x17c)](this,_0x13031b);},Game_Interpreter[_0x12ccb4(0x270)][_0x12ccb4(0x2c4)]=function(){const _0x404826=_0x12ccb4,_0x4eb5d7=this[_0x404826(0x1d0)],_0x84819e=[];let _0x16f978=0x0;this[_0x404826(0x1d0)]++;while(this[_0x404826(0x1d0)]<this['_list'][_0x404826(0x2ab)]){if(this[_0x404826(0x2f7)]()[_0x404826(0x2d5)]===this['_indent']){if(this[_0x404826(0x2f7)]()[_0x404826(0x281)]===0x194&&this['nextEventCode']()!==0x66)break;else{if(this[_0x404826(0x2f7)]()[_0x404826(0x281)]===0x66)this[_0x404826(0x287)](_0x16f978,this['currentCommand'](),_0x4eb5d7),this['_index']-=0x2;else this['currentCommand']()[_0x404826(0x281)]===0x192&&(this[_0x404826(0x2f7)]()[_0x404826(0x293)][0x0]=_0x16f978,_0x16f978++);}}this[_0x404826(0x1d0)]++;}return this[_0x404826(0x1d0)]=_0x4eb5d7,this[_0x404826(0x2f7)]()[_0x404826(0x293)];},Game_Interpreter[_0x12ccb4(0x270)][_0x12ccb4(0x287)]=function(_0x3dd23f,_0x466dc4,_0x158eff){const _0x2d913f=_0x12ccb4;this[_0x2d913f(0x31d)](_0x3dd23f,_0x466dc4,_0x158eff),this['adjustShowChoiceCancel'](_0x3dd23f,_0x466dc4,_0x158eff),this[_0x2d913f(0x19f)](_0x466dc4,_0x158eff);},Game_Interpreter['prototype'][_0x12ccb4(0x31d)]=function(_0x396ae7,_0x35a63d,_0x42812){const _0x12421e=_0x12ccb4;if(_0x35a63d[_0x12421e(0x293)][0x2]<0x0)return;const _0x4cb8a6=_0x35a63d[_0x12421e(0x293)][0x2]+_0x396ae7;this[_0x12421e(0x2b9)][_0x42812]['parameters'][0x2]=_0x4cb8a6;},Game_Interpreter[_0x12ccb4(0x270)][_0x12ccb4(0x180)]=function(_0x562971,_0x341886,_0x3efb04){const _0x3a8e89=_0x12ccb4;if(_0x341886['parameters'][0x1]>=0x0){var _0xdda0b0=_0x341886['parameters'][0x1]+_0x562971;this[_0x3a8e89(0x2b9)][_0x3efb04][_0x3a8e89(0x293)][0x1]=_0xdda0b0;}else _0x341886[_0x3a8e89(0x293)][0x1]===-0x2&&(this[_0x3a8e89(0x2b9)][_0x3efb04][_0x3a8e89(0x293)][0x1]=_0x341886['parameters'][0x1]);},Game_Interpreter['prototype'][_0x12ccb4(0x19f)]=function(_0x212708,_0x30d441){const _0x303799=_0x12ccb4;for(const _0x518284 of _0x212708[_0x303799(0x293)][0x0]){this[_0x303799(0x2b9)][_0x30d441]['parameters'][0x0]['push'](_0x518284);}this[_0x303799(0x2b9)][_0x303799(0x1c1)](this[_0x303799(0x1d0)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x3c9319=_0x12ccb4;this[_0x3c9319(0x19a)](...arguments);}Game_MessageCommonEvent[_0x12ccb4(0x270)][_0x12ccb4(0x19a)]=function(_0x194d7b,_0x73c4f8){const _0x326450=_0x12ccb4;this[_0x326450(0x37f)]=_0x194d7b,this[_0x326450(0x370)]=_0x73c4f8||0x0,this[_0x326450(0x1db)]();},Game_MessageCommonEvent[_0x12ccb4(0x270)][_0x12ccb4(0x1cc)]=function(){const _0x3205ef=_0x12ccb4;return $dataCommonEvents[this[_0x3205ef(0x37f)]];},Game_MessageCommonEvent[_0x12ccb4(0x270)]['list']=function(){const _0x166c4a=_0x12ccb4;return this[_0x166c4a(0x1cc)]()[_0x166c4a(0x1fd)];},Game_MessageCommonEvent[_0x12ccb4(0x270)]['refresh']=function(){const _0x1d4cb7=_0x12ccb4;this['_interpreter']=new Game_Interpreter(),this[_0x1d4cb7(0x221)][_0x1d4cb7(0x367)](this[_0x1d4cb7(0x1fd)](),this['_eventId']);},Game_MessageCommonEvent[_0x12ccb4(0x270)][_0x12ccb4(0x26c)]=function(){const _0xfd3f50=_0x12ccb4;this[_0xfd3f50(0x221)]&&(this[_0xfd3f50(0x221)][_0xfd3f50(0x213)]()?this['_interpreter'][_0xfd3f50(0x26c)]():this[_0xfd3f50(0x2a8)]());},Game_MessageCommonEvent[_0x12ccb4(0x270)]['clear']=function(){this['_interpreter']=null;},Scene_Message[_0x12ccb4(0x270)][_0x12ccb4(0x387)]=function(){const _0x251cf7=_0x12ccb4,_0x48e4bd=Math[_0x251cf7(0x378)](Graphics['width'],$gameSystem['getMessageWindowWidth']()),_0x58ae8a=$gameSystem[_0x251cf7(0x244)](),_0x496d31=this[_0x251cf7(0x2b0)](_0x58ae8a,![]),_0x24cb33=(Graphics[_0x251cf7(0x24c)]-_0x48e4bd)/0x2,_0x208ca3=0x0;return new Rectangle(_0x24cb33,_0x208ca3,_0x48e4bd,_0x496d31);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x32f)]=Scene_Options[_0x12ccb4(0x270)][_0x12ccb4(0x194)],Scene_Options['prototype'][_0x12ccb4(0x194)]=function(){const _0x5c917d=_0x12ccb4;let _0x2ba6ba=VisuMZ[_0x5c917d(0x2c5)][_0x5c917d(0x32f)]['call'](this);const _0x11023c=VisuMZ[_0x5c917d(0x2c5)][_0x5c917d(0x289)];if(_0x11023c[_0x5c917d(0x1f4)][_0x5c917d(0x1c3)]&&_0x11023c['TextSpeed'][_0x5c917d(0x2c7)])_0x2ba6ba++;return _0x2ba6ba;},VisuMZ[_0x12ccb4(0x2c5)]['Window_Base_initialize']=Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x19a)],Window_Base['prototype'][_0x12ccb4(0x19a)]=function(_0x28aed6){const _0x3246b9=_0x12ccb4;this[_0x3246b9(0x296)](_0x28aed6),VisuMZ[_0x3246b9(0x2c5)]['Window_Base_initialize']['call'](this,_0x28aed6);},Window_Base[_0x12ccb4(0x270)]['initMessageCore']=function(_0x324a14){const _0x4489c9=_0x12ccb4;this[_0x4489c9(0x395)](),this[_0x4489c9(0x27f)](),this[_0x4489c9(0x292)](_0x324a14);},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x395)]=function(){const _0x56827c=_0x12ccb4;this[_0x56827c(0x1f5)](_0x56827c(0x1d8));},Window_Base[_0x12ccb4(0x270)]['setTextAlignment']=function(_0x4bd26e){const _0x13a696=_0x12ccb4;this[_0x13a696(0x374)]=_0x4bd26e;},Window_Base['prototype']['getTextAlignment']=function(){const _0x5f2a3e=_0x12ccb4;return this[_0x5f2a3e(0x374)];},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x191)]=Window_Base[_0x12ccb4(0x270)]['textSizeEx'],Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x305)]=function(_0x32bc7b){const _0x5947b3=_0x12ccb4;return this[_0x5947b3(0x27f)](),VisuMZ['MessageCore'][_0x5947b3(0x191)][_0x5947b3(0x17c)](this,_0x32bc7b);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x375)]=Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x20e)],Window_Base['prototype'][_0x12ccb4(0x20e)]=function(_0x573505){const _0x15ef36=_0x12ccb4;VisuMZ[_0x15ef36(0x2c5)][_0x15ef36(0x375)]['call'](this,_0x573505);if(_0x573505['drawing'])this[_0x15ef36(0x1f5)]('default');},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x27f)]=function(){this['setWordWrap'](![]);},Window_Base['prototype'][_0x12ccb4(0x2f2)]=function(){const _0x40f84a=_0x12ccb4;return this[_0x40f84a(0x335)];},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x355)]=function(_0x55fae8){return this['_wordWrap']=_0x55fae8,'';},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x292)]=function(_0x519b77){const _0x49a45b=_0x12ccb4;this[_0x49a45b(0x321)]=JsonEx[_0x49a45b(0x209)](_0x519b77);},Window_Base['prototype']['resetFontSettings']=function(){const _0x31e05c=_0x12ccb4;this[_0x31e05c(0x2ee)]['fontFace']=$gameSystem[_0x31e05c(0x2c3)](),this[_0x31e05c(0x2ee)][_0x31e05c(0x245)]=$gameSystem[_0x31e05c(0x340)](),this[_0x31e05c(0x2ee)][_0x31e05c(0x346)]=![],this['contents'][_0x31e05c(0x203)]=![],this[_0x31e05c(0x34c)]();},Window_Base[_0x12ccb4(0x270)]['resetTextColor']=function(){const _0x231860=_0x12ccb4;this[_0x231860(0x2d8)](ColorManager['normalColor']()),this[_0x231860(0x2b4)](ColorManager[_0x231860(0x26e)]());const _0x3dac21=VisuMZ['MessageCore']['Settings'][_0x231860(0x18e)];_0x3dac21[_0x231860(0x1f1)]===undefined&&(_0x3dac21[_0x231860(0x1f1)]=0x3),this['contents']['outlineWidth']=_0x3dac21[_0x231860(0x1f1)],this[_0x231860(0x361)](![]);},Window_Base[_0x12ccb4(0x270)]['setColorLock']=function(_0x5839e9){this['_colorLock']=_0x5839e9;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2f8)]=function(){const _0x284d3a=_0x12ccb4;return this[_0x284d3a(0x2e7)];},Window_Base['prototype'][_0x12ccb4(0x364)]=function(){return![];},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x19c)]=function(){const _0x451466=_0x12ccb4,_0x3cb0a7=[_0x451466(0x342),_0x451466(0x245),_0x451466(0x346),_0x451466(0x203),'textColor',_0x451466(0x328),_0x451466(0x1d7),_0x451466(0x1ea)];let _0xfffb1f={};for(const _0x3fd956 of _0x3cb0a7){_0xfffb1f[_0x3fd956]=this['contents'][_0x3fd956];}return _0xfffb1f;},Window_Base['prototype'][_0x12ccb4(0x1a7)]=function(_0x477666){const _0x4551d0=_0x12ccb4;for(const _0x280944 in _0x477666){this[_0x4551d0(0x2ee)][_0x280944]=_0x477666[_0x280944];}},VisuMZ[_0x12ccb4(0x2c5)]['Window_Base_update']=Window_Base['prototype'][_0x12ccb4(0x26c)],Window_Base['prototype'][_0x12ccb4(0x26c)]=function(){const _0x4f4f7f=_0x12ccb4;VisuMZ['MessageCore'][_0x4f4f7f(0x1b2)]['call'](this),this[_0x4f4f7f(0x331)]();},Window_Base['prototype'][_0x12ccb4(0x25b)]=function(){return![];},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x331)]=function(){const _0x3a88cc=_0x12ccb4;this[_0x3a88cc(0x231)]>0x0&&(this[_0x3a88cc(0x25b)]()&&(this['x']=this[_0x3a88cc(0x1a1)](this['x'],this['_moveTargetX']),this['y']=this[_0x3a88cc(0x1a1)](this['y'],this[_0x3a88cc(0x2ce)]),this[_0x3a88cc(0x345)]=this[_0x3a88cc(0x1a1)](this['width'],this[_0x3a88cc(0x326)]),this[_0x3a88cc(0x2d1)]=this[_0x3a88cc(0x1a1)](this[_0x3a88cc(0x2d1)],this[_0x3a88cc(0x1ac)]),this[_0x3a88cc(0x255)]()),this[_0x3a88cc(0x231)]--);},Window_Base['prototype']['clampPlacementPosition']=function(_0x4c8b0d,_0xa30f6f){const _0x2bc41e=_0x12ccb4;!_0x4c8b0d&&(this[_0x2bc41e(0x345)]=Math['min'](this[_0x2bc41e(0x345)],Graphics['width']),this[_0x2bc41e(0x2d1)]=Math[_0x2bc41e(0x378)](this[_0x2bc41e(0x2d1)],Graphics[_0x2bc41e(0x2d1)]));if(!_0xa30f6f){const _0x3c42b7=-(Math[_0x2bc41e(0x38f)](Graphics[_0x2bc41e(0x345)]-Graphics['boxWidth'])/0x2),_0x10e42b=_0x3c42b7+Graphics[_0x2bc41e(0x345)]-this['width'],_0x188abf=-(Math[_0x2bc41e(0x38f)](Graphics[_0x2bc41e(0x2d1)]-Graphics[_0x2bc41e(0x2db)])/0x2),_0x46b666=_0x188abf+Graphics[_0x2bc41e(0x2d1)]-this[_0x2bc41e(0x2d1)];this['x']=this['x'][_0x2bc41e(0x1c2)](_0x3c42b7,_0x10e42b),this['y']=this['y']['clamp'](_0x188abf,_0x46b666);}},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1a1)]=function(_0x2ff578,_0x2cc57d){const _0x137641=_0x12ccb4,_0x261530=this['_moveDuration'],_0x420e1c=this[_0x137641(0x354)],_0x3bdb80=this[_0x137641(0x2a5)]((_0x420e1c-_0x261530)/_0x420e1c),_0x4ea594=this[_0x137641(0x2a5)]((_0x420e1c-_0x261530+0x1)/_0x420e1c),_0x266c9b=(_0x2ff578-_0x2cc57d*_0x3bdb80)/(0x1-_0x3bdb80);return _0x266c9b+(_0x2cc57d-_0x266c9b)*_0x4ea594;},Window_Base[_0x12ccb4(0x270)]['calcMoveEasing']=function(_0xdddc55){const _0x489edf=_0x12ccb4,_0x34a444=0x2;switch(this['_moveEasingType']){case 0x0:return _0xdddc55;case 0x1:return this[_0x489edf(0x320)](_0xdddc55,_0x34a444);case 0x2:return this['easeOut'](_0xdddc55,_0x34a444);case 0x3:return this[_0x489edf(0x1f6)](_0xdddc55,_0x34a444);default:return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x489edf(0x1a1)](_0xdddc55,this[_0x489edf(0x1ae)]):_0xdddc55;}},Window_Base['prototype'][_0x12ccb4(0x27b)]=function(_0x3fe1bc,_0x146155,_0x2ee52a,_0x190756,_0x2268d9,_0x184a76){const _0x261478=_0x12ccb4;this[_0x261478(0x285)]=_0x3fe1bc,this[_0x261478(0x2ce)]=_0x146155,this[_0x261478(0x326)]=_0x2ee52a||this[_0x261478(0x345)],this[_0x261478(0x1ac)]=_0x190756||this['height'],this[_0x261478(0x231)]=_0x2268d9||0x1;if(this['_moveDuration']<=0x0)this[_0x261478(0x231)]=0x1;this['_wholeMoveDuration']=this['_moveDuration'],this[_0x261478(0x1ae)]=_0x184a76||0x0;},Window_Base['prototype'][_0x12ccb4(0x1b5)]=function(_0x4089a0,_0x4508b3,_0x400d18,_0xae7b99,_0x51ff11,_0x2ec427){const _0x551f94=_0x12ccb4;this[_0x551f94(0x285)]=this['x']+_0x4089a0,this['_moveTargetY']=this['y']+_0x4508b3,this[_0x551f94(0x326)]=this[_0x551f94(0x345)]+(_0x400d18||0x0),this['_moveTargetHeight']=this['height']+(_0xae7b99||0x0),this['_moveDuration']=_0x51ff11||0x1;if(this['_moveDuration']<=0x0)this[_0x551f94(0x231)]=0x1;this[_0x551f94(0x354)]=this[_0x551f94(0x231)],this['_moveEasingType']=_0x2ec427||0x0;},Window_Base['prototype']['resetRect']=function(_0x4d950e,_0x4cc643){const _0x2dbdda=_0x12ccb4;this['moveTo'](this[_0x2dbdda(0x321)]['x'],this[_0x2dbdda(0x321)]['y'],this[_0x2dbdda(0x321)][_0x2dbdda(0x345)],this[_0x2dbdda(0x321)][_0x2dbdda(0x2d1)],_0x4d950e,_0x4cc643);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x1da)]=Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2d8)],Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2d8)]=function(_0x4839a2){const _0x5b1282=_0x12ccb4;if(this[_0x5b1282(0x2f8)]())return;_0x4839a2=_0x4839a2[_0x5b1282(0x310)](/\,/g,''),this[_0x5b1282(0x246)]=this[_0x5b1282(0x246)]||[],this[_0x5b1282(0x246)][_0x5b1282(0x1a9)](this[_0x5b1282(0x2ee)][_0x5b1282(0x230)]),VisuMZ[_0x5b1282(0x2c5)][_0x5b1282(0x1da)][_0x5b1282(0x17c)](this,_0x4839a2);},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x386)]=function(_0x5e7d51){const _0x1d33f8=_0x12ccb4;this[_0x1d33f8(0x1a8)](_0x5e7d51);if(this[_0x1d33f8(0x2f8)]())return;_0x5e7d51[_0x1d33f8(0x23f)]&&(this[_0x1d33f8(0x246)]=this[_0x1d33f8(0x246)]||[],this[_0x1d33f8(0x2ee)][_0x1d33f8(0x230)]=this[_0x1d33f8(0x246)]['shift']()||ColorManager[_0x1d33f8(0x237)]());},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x312)]=function(_0x375cf8){const _0x3273e3=_0x12ccb4;return _0x375cf8=this['convertTextMacros'](_0x375cf8),_0x375cf8=this[_0x3273e3(0x311)](_0x375cf8),_0x375cf8=this[_0x3273e3(0x344)](_0x375cf8),_0x375cf8=this['preConvertEscapeCharacters'](_0x375cf8),_0x375cf8=this['convertShowChoiceEscapeCodes'](_0x375cf8),_0x375cf8=this[_0x3273e3(0x1ba)](_0x375cf8),_0x375cf8=this[_0x3273e3(0x20d)](_0x375cf8),_0x375cf8=this[_0x3273e3(0x259)](_0x375cf8),_0x375cf8=this[_0x3273e3(0x34d)](_0x375cf8),_0x375cf8=this['convertMessageCoreEscapeActions'](_0x375cf8),_0x375cf8=this[_0x3273e3(0x26a)](_0x375cf8),_0x375cf8=this[_0x3273e3(0x1a5)](_0x375cf8),_0x375cf8=this[_0x3273e3(0x344)](_0x375cf8),_0x375cf8=this['processAutoColorWords'](_0x375cf8),_0x375cf8=this[_0x3273e3(0x1d4)](_0x375cf8),_0x375cf8;},Window_Base['prototype'][_0x12ccb4(0x339)]=function(_0x122b43){const _0x543f3e=_0x12ccb4;for(const _0x445682 of VisuMZ['MessageCore']['Settings'][_0x543f3e(0x250)]){_0x122b43[_0x543f3e(0x362)](_0x445682[_0x543f3e(0x349)])&&(_0x122b43=_0x122b43['replace'](_0x445682[_0x543f3e(0x349)],_0x445682['textCodeResult']['bind'](this)));}return _0x122b43;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x311)]=function(_0x1d9235){const _0x47c2f1=_0x12ccb4;return _0x1d9235=_0x1d9235[_0x47c2f1(0x310)](/\\/g,'\x1b'),_0x1d9235=_0x1d9235['replace'](/\x1b\x1b/g,'\x5c'),_0x1d9235;},Window_Base['prototype'][_0x12ccb4(0x344)]=function(_0x35d0eb){const _0x37dd8b=_0x12ccb4;for(;;){if(_0x35d0eb[_0x37dd8b(0x362)](/\\V\[(\d+)\]/gi))_0x35d0eb=_0x35d0eb[_0x37dd8b(0x310)](/\\V\[(\d+)\]/gi,(_0x5784d1,_0x171a04)=>this[_0x37dd8b(0x311)](String($gameVariables[_0x37dd8b(0x18b)](parseInt(_0x171a04)))));else{if(_0x35d0eb[_0x37dd8b(0x362)](/\x1bV\[(\d+)\]/gi))_0x35d0eb=_0x35d0eb['replace'](/\x1bV\[(\d+)\]/gi,(_0x5b2f99,_0x230f13)=>this[_0x37dd8b(0x311)](String($gameVariables[_0x37dd8b(0x18b)](parseInt(_0x230f13)))));else break;}}return _0x35d0eb;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x247)]=function(_0x4e0eaf){const _0x684de6=_0x12ccb4;return this[_0x684de6(0x18d)](),_0x4e0eaf;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1a5)]=function(_0x3033ea){return _0x3033ea;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x353)]=function(_0x2f205a){const _0x35ba77=_0x12ccb4;return _0x2f205a=_0x2f205a[_0x35ba77(0x310)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x2f205a=_0x2f205a[_0x35ba77(0x310)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x2f205a=_0x2f205a[_0x35ba77(0x310)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x2f205a;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1ba)]=function(_0x811e66){const _0x546676=_0x12ccb4;return _0x811e66=_0x811e66[_0x546676(0x310)](/<B>/gi,'\x1bBOLD[1]'),_0x811e66=_0x811e66[_0x546676(0x310)](/<\/B>/gi,'\x1bBOLD[0]'),_0x811e66=_0x811e66[_0x546676(0x310)](/<I>/gi,_0x546676(0x21d)),_0x811e66=_0x811e66['replace'](/<\/I>/gi,_0x546676(0x33a)),_0x811e66;},Window_Base[_0x12ccb4(0x270)]['convertTextAlignmentEscapeCharacters']=function(_0x11502d){const _0x1a4b73=_0x12ccb4;return _0x11502d=_0x11502d[_0x1a4b73(0x310)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x11502d=_0x11502d['replace'](/<\/LEFT>/gi,_0x1a4b73(0x252)),_0x11502d=_0x11502d[_0x1a4b73(0x310)](/<CENTER>/gi,_0x1a4b73(0x373)),_0x11502d=_0x11502d['replace'](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x11502d=_0x11502d[_0x1a4b73(0x310)](/<RIGHT>/gi,_0x1a4b73(0x2bc)),_0x11502d=_0x11502d[_0x1a4b73(0x310)](/<\/RIGHT>/gi,_0x1a4b73(0x252)),_0x11502d;},Window_Base[_0x12ccb4(0x270)]['convertLockColorsEscapeCharacters']=function(_0x7a67d1){const _0x3d48ee=_0x12ccb4;return _0x7a67d1=_0x7a67d1[_0x3d48ee(0x310)](/<COLORLOCK>/gi,_0x3d48ee(0x2ed)),_0x7a67d1=_0x7a67d1[_0x3d48ee(0x310)](/<\/COLORLOCK>/gi,_0x3d48ee(0x1de)),_0x7a67d1=_0x7a67d1[_0x3d48ee(0x310)](/\(\(\(/gi,_0x3d48ee(0x2ed)),_0x7a67d1=_0x7a67d1['replace'](/\)\)\)/gi,_0x3d48ee(0x1de)),_0x7a67d1;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x34d)]=function(_0xcc3497){const _0x4798de=_0x12ccb4;return _0xcc3497=_0xcc3497[_0x4798de(0x310)](/\x1bN\[(\d+)\]/gi,(_0x3d683c,_0x23e920)=>this[_0x4798de(0x2a9)](parseInt(_0x23e920))),_0xcc3497=_0xcc3497[_0x4798de(0x310)](/\x1bP\[(\d+)\]/gi,(_0x42d32b,_0x247167)=>this[_0x4798de(0x278)](parseInt(_0x247167))),_0xcc3497=_0xcc3497[_0x4798de(0x310)](/\x1bG/gi,TextManager[_0x4798de(0x1c5)]),_0xcc3497;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x184)]=function(_0x2007a7){const _0x364493=_0x12ccb4;for(const _0x1717e8 of VisuMZ[_0x364493(0x2c5)][_0x364493(0x289)][_0x364493(0x1ce)]){_0x2007a7[_0x364493(0x362)](_0x1717e8['textCodeCheck'])&&(_0x2007a7=_0x2007a7[_0x364493(0x310)](_0x1717e8[_0x364493(0x349)],_0x1717e8['textCodeResult']),_0x2007a7=this[_0x364493(0x344)](_0x2007a7));}return _0x2007a7;},Window_Base['prototype'][_0x12ccb4(0x26a)]=function(_0x10e59d){const _0x1c9178=_0x12ccb4;for(const _0x391ac8 of VisuMZ['MessageCore']['Settings']['TextCodeReplace']){_0x10e59d['match'](_0x391ac8[_0x1c9178(0x349)])&&(_0x10e59d=_0x10e59d[_0x1c9178(0x310)](_0x391ac8['textCodeCheck'],_0x391ac8[_0x1c9178(0x206)][_0x1c9178(0x1b9)](this)),_0x10e59d=this['convertVariableEscapeCharacters'](_0x10e59d));}return _0x10e59d;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2a9)]=function(_0xe2ad8e){const _0x4c45b5=_0x12ccb4,_0x5ec571=_0xe2ad8e>=0x1?$gameActors[_0x4c45b5(0x2a7)](_0xe2ad8e):null,_0x9a8515=_0x5ec571?_0x5ec571[_0x4c45b5(0x384)]():'',_0x5338b4=Number(VisuMZ[_0x4c45b5(0x2c5)][_0x4c45b5(0x289)]['AutoColor'][_0x4c45b5(0x1f0)]);return this[_0x4c45b5(0x364)]()&&_0x5338b4!==0x0?_0x4c45b5(0x1bc)[_0x4c45b5(0x308)](_0x5338b4,_0x9a8515):_0x9a8515;},Window_Base[_0x12ccb4(0x270)]['partyMemberName']=function(_0x5d1fa6){const _0x36372a=_0x12ccb4,_0x117d21=_0x5d1fa6>=0x1?$gameParty['members']()[_0x5d1fa6-0x1]:null,_0x4e4cf3=_0x117d21?_0x117d21[_0x36372a(0x384)]():'',_0x5cca9e=Number(VisuMZ[_0x36372a(0x2c5)][_0x36372a(0x289)][_0x36372a(0x1e5)][_0x36372a(0x1f0)]);return this[_0x36372a(0x364)]()&&_0x5cca9e!==0x0?_0x36372a(0x1bc)[_0x36372a(0x308)](_0x5cca9e,_0x4e4cf3):_0x4e4cf3;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x398)]=function(_0x8a39ac){const _0x4c861e=_0x12ccb4;return this[_0x4c861e(0x364)]()&&(_0x8a39ac=this[_0x4c861e(0x329)](_0x8a39ac),_0x8a39ac=this[_0x4c861e(0x233)](_0x8a39ac)),_0x8a39ac;},Window_Base[_0x12ccb4(0x270)]['processStoredAutoColorChanges']=function(_0x5721bd){const _0x3b5174=_0x12ccb4;for(autoColor of VisuMZ['MessageCore'][_0x3b5174(0x22c)]){_0x5721bd=_0x5721bd[_0x3b5174(0x310)](autoColor[0x0],autoColor[0x1]);}return _0x5721bd;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x34f)]=function(){const _0x2e05c2=_0x12ccb4;this[_0x2e05c2(0x264)]=[];},Window_Base[_0x12ccb4(0x270)]['registerActorNameAutoColorChanges']=function(){const _0x378cb4=_0x12ccb4;this[_0x378cb4(0x34f)]();const _0x455dd2=VisuMZ[_0x378cb4(0x2c5)][_0x378cb4(0x289)][_0x378cb4(0x1e5)],_0x4b7391=_0x455dd2[_0x378cb4(0x1f0)];if(_0x4b7391<=0x0)return;for(const _0x170ebb of $gameActors[_0x378cb4(0x2d2)]){if(!_0x170ebb)continue;const _0x5d3307=_0x170ebb[_0x378cb4(0x384)]();if(_0x5d3307[_0x378cb4(0x2b1)]()[_0x378cb4(0x2ab)]<=0x0)continue;if(/^\d+$/[_0x378cb4(0x34e)](_0x5d3307))continue;if(_0x5d3307['match'](/-----/i))continue;let _0x17c8af=VisuMZ[_0x378cb4(0x2c5)]['ConvertTextAutoColorRegExpFriendly'](_0x5d3307);const _0x3c57b9=new RegExp('\x5cb'+_0x17c8af+'\x5cb','g'),_0x370c1a=_0x378cb4(0x1bc)[_0x378cb4(0x308)](_0x4b7391,_0x5d3307);this[_0x378cb4(0x264)][_0x378cb4(0x1bd)]([_0x3c57b9,_0x370c1a]);}},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x233)]=function(_0x54e36c){const _0x1218a1=_0x12ccb4;this[_0x1218a1(0x264)]===undefined&&this[_0x1218a1(0x18d)]();for(autoColor of this[_0x1218a1(0x264)]){_0x54e36c=_0x54e36c[_0x1218a1(0x310)](autoColor[0x0],autoColor[0x1]);}return _0x54e36c;},Window_Base['prototype'][_0x12ccb4(0x1c0)]=function(_0x1f4eab,_0x5ca22c,_0x224614){const _0x1ed64e=_0x12ccb4;if(!_0x1f4eab)return'';const _0x274cc7=_0x1f4eab[_0x5ca22c];let _0x308795='';if(_0x274cc7&&_0x224614&&_0x274cc7[_0x1ed64e(0x1cf)]){const _0x18bc17=_0x1ed64e(0x23c);_0x308795=_0x18bc17[_0x1ed64e(0x308)](_0x274cc7['iconIndex'],_0x274cc7[_0x1ed64e(0x384)]);}else _0x274cc7?_0x308795=_0x274cc7['name']:_0x308795='';return this[_0x1ed64e(0x364)]()&&(_0x308795=this['applyDatabaseAutoColor'](_0x308795,_0x1f4eab)),_0x308795;},Window_Base[_0x12ccb4(0x270)]['lastGainedObjectName']=function(_0x4d8ffe){const _0x35e6d5=_0x12ccb4,_0x597471=$gameParty[_0x35e6d5(0x30e)]();if(_0x597471['id']<0x0)return'';let _0x3e2704=null;if(_0x597471[_0x35e6d5(0x389)]===0x0)_0x3e2704=$dataItems[_0x597471['id']];if(_0x597471[_0x35e6d5(0x389)]===0x1)_0x3e2704=$dataWeapons[_0x597471['id']];if(_0x597471['type']===0x2)_0x3e2704=$dataArmors[_0x597471['id']];if(!_0x3e2704)return'';return _0x4d8ffe?_0x35e6d5(0x23c)[_0x35e6d5(0x308)](_0x3e2704[_0x35e6d5(0x1cf)],_0x3e2704[_0x35e6d5(0x384)]):_0x3e2704[_0x35e6d5(0x384)];},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2e9)]=function(){const _0x1ee3dd=_0x12ccb4,_0x44866a=$gameParty['getLastGainedItemData']();if(_0x44866a['id']<=0x0)return'';return _0x44866a[_0x1ee3dd(0x2ef)];},Window_Base['prototype'][_0x12ccb4(0x38d)]=function(_0x5abe48,_0x592e8c){const _0xee71e9=_0x12ccb4,_0x2089ef=VisuMZ[_0xee71e9(0x2c5)][_0xee71e9(0x289)]['AutoColor'];let _0x1780b2=0x0;if(_0x592e8c===$dataActors)_0x1780b2=_0x2089ef[_0xee71e9(0x1f0)];if(_0x592e8c===$dataClasses)_0x1780b2=_0x2089ef[_0xee71e9(0x2eb)];if(_0x592e8c===$dataSkills)_0x1780b2=_0x2089ef[_0xee71e9(0x2c9)];if(_0x592e8c===$dataItems)_0x1780b2=_0x2089ef[_0xee71e9(0x1dd)];if(_0x592e8c===$dataWeapons)_0x1780b2=_0x2089ef[_0xee71e9(0x242)];if(_0x592e8c===$dataArmors)_0x1780b2=_0x2089ef[_0xee71e9(0x33c)];if(_0x592e8c===$dataEnemies)_0x1780b2=_0x2089ef['Enemies'];if(_0x592e8c===$dataStates)_0x1780b2=_0x2089ef['States'];return _0x1780b2>0x0&&(_0x5abe48=_0xee71e9(0x1bc)[_0xee71e9(0x308)](_0x1780b2,_0x5abe48)),_0x5abe48;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1d4)]=function(_0x5ceeb6){const _0x32ba4e=_0x12ccb4;_0x5ceeb6=_0x5ceeb6['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x166e79,_0x1fc77c)=>this[_0x32ba4e(0x355)](!![])),_0x5ceeb6=_0x5ceeb6[_0x32ba4e(0x310)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x3c3225,_0x4def7f)=>this[_0x32ba4e(0x355)](![])),_0x5ceeb6=_0x5ceeb6[_0x32ba4e(0x310)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x46f7f8,_0x4439c3)=>this[_0x32ba4e(0x355)](![]));if(_0x5ceeb6[_0x32ba4e(0x362)](Window_Message[_0x32ba4e(0x272)]))this['setWordWrap'](![]);else _0x5ceeb6[_0x32ba4e(0x362)](Window_Message[_0x32ba4e(0x2f0)])&&this[_0x32ba4e(0x355)](![]);if(!this[_0x32ba4e(0x2f2)]())return _0x5ceeb6;if(_0x5ceeb6[_0x32ba4e(0x2ab)]<=0x0)return _0x5ceeb6;return VisuMZ[_0x32ba4e(0x2c5)][_0x32ba4e(0x289)][_0x32ba4e(0x36c)]['LineBreakSpace']?(_0x5ceeb6=_0x5ceeb6['replace'](/[\n\r]+/g,'\x20'),_0x5ceeb6=_0x5ceeb6[_0x32ba4e(0x310)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x5ceeb6=_0x5ceeb6[_0x32ba4e(0x310)](/[\n\r]+/g,''),_0x5ceeb6=_0x5ceeb6[_0x32ba4e(0x310)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x5ceeb6=this['addWrapBreakAfterPunctuation'](_0x5ceeb6),_0x5ceeb6=_0x5ceeb6[_0x32ba4e(0x187)]('\x20')[_0x32ba4e(0x1ca)](_0x32ba4e(0x20a)),_0x5ceeb6=_0x5ceeb6[_0x32ba4e(0x310)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x5ceeb6=_0x5ceeb6[_0x32ba4e(0x310)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x5ceeb6;},Window_Base['prototype']['addWrapBreakAfterPunctuation']=function(_0x46f076){return _0x46f076;},VisuMZ[_0x12ccb4(0x2c5)]['Window_Base_processNewLine']=Window_Base['prototype']['processNewLine'],Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2bf)]=function(_0x1432e4){const _0x100381=_0x12ccb4;VisuMZ[_0x100381(0x2c5)][_0x100381(0x1a0)]['call'](this,_0x1432e4),this[_0x100381(0x1d6)](_0x1432e4);},VisuMZ['MessageCore'][_0x12ccb4(0x23d)]=Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x243)],Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x243)]=function(_0x134541,_0x1e477f){const _0x3262c1=_0x12ccb4;VisuMZ[_0x3262c1(0x2c5)][_0x3262c1(0x23d)][_0x3262c1(0x17c)](this,_0x134541,_0x1e477f),_0x1e477f===_0x3262c1(0x20a)&&this[_0x3262c1(0x256)](_0x134541);},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1c8)]=function(_0x34e4be){const _0x4504f1=_0x12ccb4;var _0x6ef58c=/^\<(.*?)\>/['exec'](_0x34e4be['text'][_0x4504f1(0x2b7)](_0x34e4be[_0x4504f1(0x22d)]));return _0x6ef58c?(_0x34e4be['index']+=_0x6ef58c[0x0][_0x4504f1(0x2ab)],String(_0x6ef58c[0x0]['slice'](0x1,_0x6ef58c[0x0]['length']-0x1))):'';},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x1b6)]=Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x28d)],Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x28d)]=function(_0x29d607,_0x34a5aa){const _0x48b4d1=_0x12ccb4;switch(_0x29d607){case'C':_0x34a5aa['drawing']?VisuMZ[_0x48b4d1(0x2c5)][_0x48b4d1(0x1b6)][_0x48b4d1(0x17c)](this,_0x29d607,_0x34a5aa):this[_0x48b4d1(0x1a8)](_0x34a5aa);break;case'I':case'{':case'}':VisuMZ[_0x48b4d1(0x2c5)][_0x48b4d1(0x1b6)]['call'](this,_0x29d607,_0x34a5aa);break;case'FS':this[_0x48b4d1(0x1b0)](_0x34a5aa);break;case'PX':this[_0x48b4d1(0x323)](_0x34a5aa);break;case'PY':this[_0x48b4d1(0x1fb)](_0x34a5aa);break;case'BOLD':this[_0x48b4d1(0x238)](this[_0x48b4d1(0x1a8)](_0x34a5aa));break;case _0x48b4d1(0x261):this[_0x48b4d1(0x282)](_0x34a5aa);break;case _0x48b4d1(0x31e):this[_0x48b4d1(0x363)](_0x34a5aa);break;case _0x48b4d1(0x298):this[_0x48b4d1(0x19d)](_0x34a5aa);break;case _0x48b4d1(0x26f):this[_0x48b4d1(0x2df)](this[_0x48b4d1(0x1a8)](_0x34a5aa));break;case _0x48b4d1(0x1a3):this[_0x48b4d1(0x2ac)](_0x34a5aa);break;case _0x48b4d1(0x205):this[_0x48b4d1(0x386)](_0x34a5aa);break;case _0x48b4d1(0x2a0):this[_0x48b4d1(0x254)](_0x34a5aa);break;case _0x48b4d1(0x35f):this[_0x48b4d1(0x222)](_0x34a5aa);break;case'WRAPBREAK':this[_0x48b4d1(0x256)](_0x34a5aa);break;default:this[_0x48b4d1(0x2b2)](_0x29d607,_0x34a5aa);}},Window_Base['prototype']['processMessageCoreEscapeActions']=function(_0x419e95,_0x2e131b){const _0x23eef3=_0x12ccb4;for(const _0x15d86f of VisuMZ[_0x23eef3(0x2c5)][_0x23eef3(0x289)][_0x23eef3(0x1ce)]){if(_0x15d86f[_0x23eef3(0x37d)]===_0x419e95){if(_0x15d86f[_0x23eef3(0x218)]==='')this[_0x23eef3(0x1a8)](_0x2e131b);_0x15d86f[_0x23eef3(0x2fb)][_0x23eef3(0x17c)](this,_0x2e131b);if(this[_0x23eef3(0x2e3)]===Window_Message){const _0x55e5ce=_0x15d86f['CommonEvent']||0x0;if(_0x55e5ce>0x0)this[_0x23eef3(0x2c8)](_0x55e5ce);}}}},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x309)]=function(){const _0x3e7c1a=_0x12ccb4;this['contents'][_0x3e7c1a(0x245)]+=VisuMZ[_0x3e7c1a(0x2c5)]['Settings']['General'][_0x3e7c1a(0x2b5)],this[_0x3e7c1a(0x2ee)][_0x3e7c1a(0x245)]=Math[_0x3e7c1a(0x378)](this[_0x3e7c1a(0x2ee)]['fontSize'],VisuMZ[_0x3e7c1a(0x2c5)][_0x3e7c1a(0x289)][_0x3e7c1a(0x18e)]['FontBiggerCap']);},Window_Base[_0x12ccb4(0x270)]['makeFontSmaller']=function(){const _0x5de743=_0x12ccb4;this[_0x5de743(0x2ee)][_0x5de743(0x245)]-=VisuMZ[_0x5de743(0x2c5)]['Settings']['General'][_0x5de743(0x2b5)],this['contents'][_0x5de743(0x245)]=Math[_0x5de743(0x31a)](this[_0x5de743(0x2ee)][_0x5de743(0x245)],VisuMZ[_0x5de743(0x2c5)][_0x5de743(0x289)]['General'][_0x5de743(0x19b)]);},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1b0)]=function(_0x1601c3){const _0x222d4d=_0x12ccb4,_0x5e1634=this[_0x222d4d(0x1a8)](_0x1601c3);this[_0x222d4d(0x2ee)]['fontSize']=_0x5e1634['clamp'](VisuMZ['MessageCore']['Settings'][_0x222d4d(0x18e)][_0x222d4d(0x19b)],VisuMZ[_0x222d4d(0x2c5)][_0x222d4d(0x289)]['General'][_0x222d4d(0x396)]);},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1fa)]=function(_0x5337c3){const _0x3a5ff5=_0x12ccb4;let _0x16b71c=this['contents'][_0x3a5ff5(0x245)];const _0x3def76=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x37bc63=_0x3def76['exec'](_0x5337c3);if(!_0x37bc63)break;const _0x3f686a=String(_0x37bc63[0x1])['toUpperCase']();if(_0x3f686a==='{')this[_0x3a5ff5(0x309)]();else{if(_0x3f686a==='}')this[_0x3a5ff5(0x35e)]();else _0x3f686a==='FS'&&(this[_0x3a5ff5(0x2ee)][_0x3a5ff5(0x245)]=parseInt(_0x37bc63[0x3])[_0x3a5ff5(0x1c2)](VisuMZ[_0x3a5ff5(0x2c5)]['Settings'][_0x3a5ff5(0x18e)][_0x3a5ff5(0x19b)],VisuMZ['MessageCore'][_0x3a5ff5(0x289)]['General'][_0x3a5ff5(0x396)]));}this[_0x3a5ff5(0x2ee)][_0x3a5ff5(0x245)]>_0x16b71c&&(_0x16b71c=this[_0x3a5ff5(0x2ee)][_0x3a5ff5(0x245)]);}return _0x16b71c;},Window_Base[_0x12ccb4(0x270)]['processPxTextCode']=function(_0x50b8b6){const _0x31c076=_0x12ccb4;_0x50b8b6['x']=this['obtainEscapeParam'](_0x50b8b6),VisuMZ[_0x31c076(0x2c5)][_0x31c076(0x289)][_0x31c076(0x18e)]['RelativePXPY']&&(_0x50b8b6['x']+=_0x50b8b6['startX']);},Window_Base[_0x12ccb4(0x270)]['processPyTextCode']=function(_0x55c173){const _0x5ad76b=_0x12ccb4;_0x55c173['y']=this['obtainEscapeParam'](_0x55c173),VisuMZ['MessageCore'][_0x5ad76b(0x289)][_0x5ad76b(0x18e)]['RelativePXPY']&&(_0x55c173['y']+=_0x55c173[_0x5ad76b(0x271)]);},Window_Base['prototype']['processFontChangeBold']=function(_0xade503){const _0x8c0ba6=_0x12ccb4;this[_0x8c0ba6(0x2ee)]['fontBold']=!!_0xade503;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2df)]=function(_0x2ca4d6){const _0x3de402=_0x12ccb4;this[_0x3de402(0x2ee)]['fontItalic']=!!_0x2ca4d6;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x254)]=function(_0x3ac03e){const _0x5e9024=_0x12ccb4,_0x2bb958=this[_0x5e9024(0x1a8)](_0x3ac03e);if(!_0x3ac03e['drawing'])return;switch(_0x2bb958){case 0x0:this['setTextAlignment'](_0x5e9024(0x1d8));return;case 0x1:this['setTextAlignment'](_0x5e9024(0x19e));break;case 0x2:this[_0x5e9024(0x1f5)](_0x5e9024(0x1af));break;case 0x3:this[_0x5e9024(0x1f5)](_0x5e9024(0x334));break;}this[_0x5e9024(0x1d6)](_0x3ac03e);},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1d6)]=function(_0x55cbf4){const _0x8e9351=_0x12ccb4;if(!_0x55cbf4[_0x8e9351(0x23f)])return;if(_0x55cbf4[_0x8e9351(0x2e6)])return;if(this[_0x8e9351(0x288)]()==='default')return;let _0x31b124=_0x55cbf4[_0x8e9351(0x27e)][_0x8e9351(0x37b)](_0x8e9351(0x24f),_0x55cbf4[_0x8e9351(0x22d)]+0x1),_0x125f5f=_0x55cbf4[_0x8e9351(0x27e)]['indexOf']('\x0a',_0x55cbf4[_0x8e9351(0x22d)]+0x1);if(_0x31b124<0x0)_0x31b124=_0x55cbf4['text'][_0x8e9351(0x2ab)]+0x1;if(_0x125f5f>0x0)_0x31b124=Math[_0x8e9351(0x378)](_0x31b124,_0x125f5f);const _0x752d83=_0x55cbf4[_0x8e9351(0x27e)]['substring'](_0x55cbf4[_0x8e9351(0x22d)],_0x31b124),_0x1f6520=this[_0x8e9351(0x2f9)](_0x752d83)['width'],_0x326a42=_0x55cbf4[_0x8e9351(0x345)]||this['innerWidth'],_0x5e5e8f=this[_0x8e9351(0x2e3)]===Window_Message&&$gameMessage[_0x8e9351(0x29c)]()!=='';switch(this[_0x8e9351(0x288)]()){case _0x8e9351(0x19e):_0x55cbf4['x']=_0x55cbf4['startX'];break;case'center':_0x55cbf4['x']=_0x55cbf4[_0x8e9351(0x315)],_0x55cbf4['x']+=Math[_0x8e9351(0x38f)]((_0x326a42-_0x1f6520)/0x2);_0x5e5e8f&&(_0x55cbf4['x']-=_0x55cbf4['startX']/0x2);break;case'right':_0x55cbf4['x']=_0x326a42-_0x1f6520+_0x55cbf4[_0x8e9351(0x315)];_0x5e5e8f&&(_0x55cbf4['x']-=_0x55cbf4[_0x8e9351(0x315)]);break;}},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2f9)]=function(_0x3379dd){const _0x1f13e5=_0x12ccb4;_0x3379dd=_0x3379dd['replace'](/\x1b!/g,''),_0x3379dd=_0x3379dd[_0x1f13e5(0x310)](/\x1b\|/g,''),_0x3379dd=_0x3379dd[_0x1f13e5(0x310)](/\x1b\./g,'');const _0x3bba19=this[_0x1f13e5(0x249)](_0x3379dd,0x0,0x0,0x0),_0x1ba401=this[_0x1f13e5(0x19c)]();return _0x3bba19['drawing']=![],this['processAllText'](_0x3bba19),this[_0x1f13e5(0x1a7)](_0x1ba401),{'width':_0x3bba19[_0x1f13e5(0x397)],'height':_0x3bba19['outputHeight']};},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x256)]=function(_0x3a2936){const _0x44458b=_0x12ccb4,_0x303e27=(_0x3a2936[_0x44458b(0x2e6)]?-0x1:0x1)*this['textWidth']('\x20');_0x3a2936['x']+=_0x303e27;if(this[_0x44458b(0x1a8)](_0x3a2936)>0x0)_0x3a2936['x']+=_0x303e27;if(_0x3a2936[_0x44458b(0x2e6)])return;let _0x3a6123=_0x3a2936[_0x44458b(0x27e)][_0x44458b(0x37b)](_0x44458b(0x20a),_0x3a2936[_0x44458b(0x22d)]+0x1),_0x2a3d80=_0x3a2936['text'][_0x44458b(0x37b)]('\x0a',_0x3a2936[_0x44458b(0x22d)]+0x1);if(_0x3a6123<0x0)_0x3a6123=_0x3a2936[_0x44458b(0x27e)]['length']+0x1;if(_0x2a3d80>0x0)_0x3a6123=Math[_0x44458b(0x378)](_0x3a6123,_0x2a3d80);const _0x1f6c7f=_0x3a2936[_0x44458b(0x27e)][_0x44458b(0x327)](_0x3a2936[_0x44458b(0x22d)],_0x3a6123),_0x1f0edb=this[_0x44458b(0x337)](_0x1f6c7f)['width'];let _0x137dbf=_0x3a2936[_0x44458b(0x345)]||this[_0x44458b(0x234)];if(this[_0x44458b(0x2e3)]===Window_Message){const _0x236e62=$gameMessage[_0x44458b(0x29c)]()===''?0x0:ImageManager[_0x44458b(0x200)]+0x14;_0x137dbf-=_0x236e62,VisuMZ[_0x44458b(0x2c5)][_0x44458b(0x289)][_0x44458b(0x36c)][_0x44458b(0x25f)]&&(_0x137dbf-=_0x236e62);}let _0x1a4cf4=![];if(_0x3a2936['x']+_0x1f0edb>_0x3a2936[_0x44458b(0x315)]+_0x137dbf)_0x1a4cf4=!![];if(_0x1f0edb===0x0)_0x1a4cf4=!![];_0x1a4cf4&&(_0x3a2936[_0x44458b(0x27e)]=_0x3a2936[_0x44458b(0x27e)]['slice'](0x0,_0x3a2936[_0x44458b(0x22d)])+'\x0a'+_0x3a2936['text'][_0x44458b(0x1f3)](_0x3a2936['index']));},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x337)]=function(_0x12628d){const _0x46f7d8=_0x12ccb4,_0x401567=this[_0x46f7d8(0x249)](_0x12628d,0x0,0x0,0x0),_0xdd0219=this[_0x46f7d8(0x19c)]();return _0x401567['drawing']=![],this[_0x46f7d8(0x355)](![]),this['processAllText'](_0x401567),this[_0x46f7d8(0x355)](!![]),this[_0x46f7d8(0x1a7)](_0xdd0219),{'width':_0x401567['outputWidth'],'height':_0x401567['outputHeight']};},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x19d)]=function(_0x35b641){const _0x15bff0=_0x12ccb4;return this[_0x15bff0(0x1a8)](_0x35b641);},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x2ac)]=function(_0x4a803d){const _0x15fb95=_0x12ccb4,_0x457ddf=this[_0x15fb95(0x1c8)](_0x4a803d)[_0x15fb95(0x187)](',');if(!_0x4a803d[_0x15fb95(0x23f)])return;const _0x6595dc=_0x457ddf[0x0][_0x15fb95(0x2b1)](),_0x500bb8=_0x457ddf[0x1]||0x0,_0x209d13=_0x457ddf[0x2]||0x0,_0x172c0b=ImageManager[_0x15fb95(0x372)](_0x6595dc),_0x206f4a=this[_0x15fb95(0x2ee)][_0x15fb95(0x1ea)];_0x172c0b[_0x15fb95(0x294)](this['drawBackPicture']['bind'](this,_0x172c0b,_0x4a803d['x'],_0x4a803d['y'],_0x500bb8,_0x209d13,_0x206f4a));},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x35a)]=function(_0x1c1e34,_0x2177ee,_0x51544d,_0x5ab405,_0x5d5284,_0x467d16){const _0x3567c3=_0x12ccb4;_0x5ab405=_0x5ab405||_0x1c1e34[_0x3567c3(0x345)],_0x5d5284=_0x5d5284||_0x1c1e34[_0x3567c3(0x2d1)],this[_0x3567c3(0x32e)][_0x3567c3(0x1ea)]=_0x467d16,this['contentsBack'][_0x3567c3(0x262)](_0x1c1e34,0x0,0x0,_0x1c1e34[_0x3567c3(0x345)],_0x1c1e34[_0x3567c3(0x2d1)],_0x2177ee,_0x51544d,_0x5ab405,_0x5d5284),this[_0x3567c3(0x32e)][_0x3567c3(0x1ea)]=0xff;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x282)]=function(_0x3cc64c){const _0x4555e7=_0x12ccb4,_0x551e19=this[_0x4555e7(0x1c8)](_0x3cc64c)[_0x4555e7(0x187)](',');if(!_0x3cc64c[_0x4555e7(0x23f)])return;const _0x5d90ac=_0x551e19[0x0][_0x4555e7(0x2b1)](),_0x142d71=ImageManager['loadPicture'](_0x5d90ac),_0x3f7f18=JsonEx[_0x4555e7(0x209)](_0x3cc64c),_0x14ab7f=this[_0x4555e7(0x2ee)][_0x4555e7(0x1ea)];_0x142d71[_0x4555e7(0x294)](this[_0x4555e7(0x1ef)]['bind'](this,_0x142d71,_0x3f7f18,_0x14ab7f));},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x1ef)]=function(_0x596b86,_0x54c04b,_0x5cbf6d){const _0x2deefd=_0x12ccb4,_0x22b4b5=_0x54c04b[_0x2deefd(0x345)]||this[_0x2deefd(0x234)],_0x13db76=this[_0x2deefd(0x1d0)]!==undefined?this[_0x2deefd(0x185)]():this[_0x2deefd(0x18c)],_0x469499=_0x22b4b5/_0x596b86[_0x2deefd(0x345)],_0x361d75=_0x13db76/_0x596b86[_0x2deefd(0x2d1)],_0x479620=Math[_0x2deefd(0x378)](_0x469499,_0x361d75,0x1),_0x447a9d=this[_0x2deefd(0x1d0)]!==undefined?(this[_0x2deefd(0x2a2)](0x0)[_0x2deefd(0x2d1)]-this['lineHeight']())/0x2:0x0,_0x430bd4=_0x596b86[_0x2deefd(0x345)]*_0x479620,_0x1ae258=_0x596b86[_0x2deefd(0x2d1)]*_0x479620,_0x39fe9f=Math['floor']((_0x22b4b5-_0x430bd4)/0x2)+_0x54c04b['startX'],_0x8ae070=Math['floor']((_0x13db76-_0x1ae258)/0x2)+_0x54c04b[_0x2deefd(0x271)]-_0x447a9d*0x2;this[_0x2deefd(0x32e)][_0x2deefd(0x1ea)]=_0x5cbf6d,this[_0x2deefd(0x32e)][_0x2deefd(0x262)](_0x596b86,0x0,0x0,_0x596b86[_0x2deefd(0x345)],_0x596b86[_0x2deefd(0x2d1)],_0x39fe9f,_0x8ae070,_0x430bd4,_0x1ae258),this['contentsBack']['paintOpacity']=0xff;},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x363)]=function(_0x3fd4d9){const _0x441639=_0x12ccb4,_0x1f6ef9=this[_0x441639(0x1a8)](_0x3fd4d9);if(_0x3fd4d9[_0x441639(0x23f)])this['setColorLock'](_0x1f6ef9>0x0);},Window_Base[_0x12ccb4(0x270)][_0x12ccb4(0x222)]=function(_0x3a7e02){const _0x3094b6=_0x12ccb4,_0x20220a=this[_0x3094b6(0x1a8)](_0x3a7e02);this[_0x3094b6(0x2e3)]===Window_Message&&_0x3a7e02[_0x3094b6(0x23f)]&&this['startWait'](_0x20220a);},Window_Help['prototype'][_0x12ccb4(0x27f)]=function(){const _0x326202=_0x12ccb4;this[_0x326202(0x355)]($gameSystem[_0x326202(0x22b)]());},Window_Help[_0x12ccb4(0x270)][_0x12ccb4(0x364)]=function(){return!![];},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x2fa)]=Window_Help[_0x12ccb4(0x270)]['refresh'],Window_Help[_0x12ccb4(0x270)][_0x12ccb4(0x1db)]=function(){const _0x48edf1=_0x12ccb4;this[_0x48edf1(0x34f)](),VisuMZ[_0x48edf1(0x2c5)][_0x48edf1(0x2fa)]['call'](this),this[_0x48edf1(0x27f)]();},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x2f1)]=Window_Options[_0x12ccb4(0x270)][_0x12ccb4(0x28a)],Window_Options[_0x12ccb4(0x270)][_0x12ccb4(0x28a)]=function(){const _0x5c3a42=_0x12ccb4;VisuMZ[_0x5c3a42(0x2c5)][_0x5c3a42(0x2f1)][_0x5c3a42(0x17c)](this),this[_0x5c3a42(0x17d)]();},Window_Options[_0x12ccb4(0x270)]['addMessageCoreCommands']=function(){const _0x257309=_0x12ccb4;VisuMZ[_0x257309(0x2c5)][_0x257309(0x289)]['TextSpeed']['AddOption']&&this[_0x257309(0x2d9)]();},Window_Options[_0x12ccb4(0x270)]['addMessageCoreTextSpeedCommand']=function(){const _0x58c3f1=_0x12ccb4,_0xe0cf44=TextManager[_0x58c3f1(0x2b8)],_0x6b9429=_0x58c3f1(0x1ed);this['addCommand'](_0xe0cf44,_0x6b9429);},VisuMZ[_0x12ccb4(0x2c5)]['Window_Options_statusText']=Window_Options['prototype'][_0x12ccb4(0x2c2)],Window_Options[_0x12ccb4(0x270)]['statusText']=function(_0x48e228){const _0x93b1=_0x12ccb4,_0x1b5abb=this['commandSymbol'](_0x48e228);if(_0x1b5abb===_0x93b1(0x1ed))return this['textSpeedStatusText']();return VisuMZ[_0x93b1(0x2c5)][_0x93b1(0x253)][_0x93b1(0x17c)](this,_0x48e228);},VisuMZ['MessageCore'][_0x12ccb4(0x1e6)]=Window_Options[_0x12ccb4(0x270)]['isVolumeSymbol'],Window_Options[_0x12ccb4(0x270)][_0x12ccb4(0x1b8)]=function(_0x387bac){const _0x4c3596=_0x12ccb4;if(_0x387bac===_0x4c3596(0x1ed))return!![];return VisuMZ[_0x4c3596(0x2c5)][_0x4c3596(0x1e6)]['call'](this,_0x387bac);},Window_Options[_0x12ccb4(0x270)][_0x12ccb4(0x23b)]=function(){const _0x39d377=_0x12ccb4,_0x1393e8=this[_0x39d377(0x2e2)]('textSpeed');return _0x1393e8>0xa?TextManager[_0x39d377(0x210)]:_0x1393e8;},VisuMZ['MessageCore'][_0x12ccb4(0x1d2)]=Window_Options[_0x12ccb4(0x270)][_0x12ccb4(0x28f)],Window_Options[_0x12ccb4(0x270)][_0x12ccb4(0x28f)]=function(_0x29a1c4,_0x5117d7,_0xda4495){const _0x4c2534=_0x12ccb4;if(_0x29a1c4===_0x4c2534(0x1ed))return this[_0x4c2534(0x381)](_0x29a1c4,_0x5117d7,_0xda4495);VisuMZ[_0x4c2534(0x2c5)][_0x4c2534(0x1d2)][_0x4c2534(0x17c)](this,_0x29a1c4,_0x5117d7,_0xda4495);},Window_Options[_0x12ccb4(0x270)][_0x12ccb4(0x381)]=function(_0x461ab2,_0xae71ca,_0x4f6de1){const _0x21359a=_0x12ccb4,_0x28f2d8=this[_0x21359a(0x2e2)](_0x461ab2),_0x55b75b=0x1,_0x33e30c=_0x28f2d8+(_0xae71ca?_0x55b75b:-_0x55b75b);_0x33e30c>0xb&&_0x4f6de1?this[_0x21359a(0x190)](_0x461ab2,0x1):this[_0x21359a(0x190)](_0x461ab2,_0x33e30c[_0x21359a(0x1c2)](0x1,0xb));},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x348)]=function(){const _0x1269d0=_0x12ccb4;Window_Base[_0x1269d0(0x270)]['refreshDimmerBitmap']['call'](this),VisuMZ['MessageCore'][_0x1269d0(0x289)][_0x1269d0(0x18e)][_0x1269d0(0x21b)]&&this['stretchDimmerSprite']();},Window_Message['prototype'][_0x12ccb4(0x1ee)]=function(){const _0x43e435=_0x12ccb4;this['_dimmerSprite']['x']=Math[_0x43e435(0x366)](this[_0x43e435(0x345)]/0x2),this[_0x43e435(0x2c6)][_0x43e435(0x383)]['x']=0.5,this[_0x43e435(0x2c6)][_0x43e435(0x32c)]['x']=Graphics[_0x43e435(0x345)];},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x188)]=Window_Message[_0x12ccb4(0x270)]['clearFlags'],Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x1b7)]=function(){const _0x5e8358=_0x12ccb4;VisuMZ['MessageCore'][_0x5e8358(0x188)][_0x5e8358(0x17c)](this),this[_0x5e8358(0x34f)](),this[_0x5e8358(0x27f)](),this[_0x5e8358(0x361)](![]),this[_0x5e8358(0x1f5)]('default'),this[_0x5e8358(0x183)](VisuMZ[_0x5e8358(0x2c5)]['Settings'][_0x5e8358(0x18e)][_0x5e8358(0x325)]);},Window_Message['prototype'][_0x12ccb4(0x27f)]=function(){const _0x242fdf=_0x12ccb4;this[_0x242fdf(0x355)]($gameSystem[_0x242fdf(0x275)]());},Window_Message['prototype']['isAutoColorAffected']=function(){return!![];},Window_Message['prototype'][_0x12ccb4(0x183)]=function(_0x338e86){const _0x2b905a=_0x12ccb4,_0x1068ca=0xb-ConfigManager[_0x2b905a(0x1ed)];_0x338e86=Math[_0x2b905a(0x366)](_0x338e86*_0x1068ca),this[_0x2b905a(0x313)]=_0x338e86,this[_0x2b905a(0x36b)]=_0x338e86;},VisuMZ[_0x12ccb4(0x2c5)]['Window_Message_isTriggered']=Window_Message[_0x12ccb4(0x270)]['isTriggered'],Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x1fc)]=function(){const _0x3b323d=_0x12ccb4;return VisuMZ[_0x3b323d(0x2c5)][_0x3b323d(0x1e3)][_0x3b323d(0x17c)](this)||Input['isPressed'](VisuMZ[_0x3b323d(0x2c5)][_0x3b323d(0x289)]['General'][_0x3b323d(0x269)]);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x201)]=Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x369)],Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x369)]=function(){const _0x549771=_0x12ccb4;let _0x1f3dc0=this['y'];VisuMZ['MessageCore']['Window_Message_updatePlacement'][_0x549771(0x17c)](this);if(this[_0x549771(0x31c)])this['y']=_0x1f3dc0;this[_0x549771(0x255)]();},VisuMZ[_0x12ccb4(0x2c5)]['Window_Message_newPage']=Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x30a)],Window_Message[_0x12ccb4(0x270)]['newPage']=function(_0x3177df){const _0x40be84=_0x12ccb4;this[_0x40be84(0x1d5)](_0x3177df),VisuMZ[_0x40be84(0x2c5)][_0x40be84(0x1c6)][_0x40be84(0x17c)](this,_0x3177df),this[_0x40be84(0x1ff)]();},Window_Message[_0x12ccb4(0x270)]['onNewPageMessageCore']=function(_0x3c3d77){const _0x46d690=_0x12ccb4;this[_0x46d690(0x220)](_0x3c3d77),this[_0x46d690(0x1c4)]();},VisuMZ[_0x12ccb4(0x2c5)]['Window_Message_terminateMessage']=Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x21c)],Window_Message[_0x12ccb4(0x270)]['terminateMessage']=function(){const _0x53dc26=_0x12ccb4;VisuMZ[_0x53dc26(0x2c5)][_0x53dc26(0x17f)][_0x53dc26(0x17c)](this),this[_0x53dc26(0x1b7)]();if(this['_messagePositionReset'])this[_0x53dc26(0x23a)]();},Window_Message['prototype']['updateDimensions']=function(){const _0xd5cf29=_0x12ccb4;this[_0xd5cf29(0x345)]=$gameSystem[_0xd5cf29(0x377)](),this[_0xd5cf29(0x345)]=Math[_0xd5cf29(0x378)](Graphics[_0xd5cf29(0x345)],this[_0xd5cf29(0x345)]);const _0x49bfb2=$gameSystem[_0xd5cf29(0x244)]();this['height']=SceneManager[_0xd5cf29(0x376)][_0xd5cf29(0x2b0)](_0x49bfb2,![]),this['height']=Math['min'](Graphics['height'],this['height']);if($gameTemp[_0xd5cf29(0x229)])this['resetPositionX']();},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x1fe)]=function(){const _0x528e79=_0x12ccb4;this['x']=(Graphics[_0x528e79(0x24c)]-this[_0x528e79(0x345)])/0x2,$gameTemp['_centerMessageWindow']=undefined,this[_0x528e79(0x255)]();},Window_Message['prototype'][_0x12ccb4(0x331)]=function(){const _0x12338d=_0x12ccb4,_0x168d37={'x':this['x'],'y':this['y']};Window_Base[_0x12338d(0x270)][_0x12338d(0x331)][_0x12338d(0x17c)](this),this[_0x12338d(0x33d)](_0x168d37);},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x25b)]=function(){return!![];},Window_Message[_0x12ccb4(0x270)]['updateNameBoxMove']=function(_0x53aa69){const _0x19677d=_0x12ccb4;this[_0x19677d(0x1e0)]&&(this[_0x19677d(0x1e0)]['x']+=this['x']-_0x53aa69['x'],this[_0x19677d(0x1e0)]['y']+=this['y']-_0x53aa69['y']);},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x1c9)]=function(_0x3ea11b,_0x513c2d){const _0x3dd582=_0x12ccb4;this[_0x3dd582(0x27b)](this[_0x3dd582(0x321)]['x'],this[_0x3dd582(0x2d3)]*(Graphics[_0x3dd582(0x2db)]-this[_0x3dd582(0x2d1)])/0x2,this['_resetRect'][_0x3dd582(0x345)],this[_0x3dd582(0x321)][_0x3dd582(0x2d1)],_0x3ea11b,_0x513c2d);},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x19d)]=function(_0x9fba67){const _0x263840=_0x12ccb4,_0x503d67=Window_Base[_0x263840(0x270)][_0x263840(0x19d)][_0x263840(0x17c)](this,_0x9fba67);_0x9fba67[_0x263840(0x23f)]&&this['launchMessageCommonEvent'](_0x503d67);},Window_Message[_0x12ccb4(0x270)]['launchMessageCommonEvent']=function(_0x5411cf){const _0x4a9b65=_0x12ccb4;if($gameParty[_0x4a9b65(0x388)]()){}else $gameMap[_0x4a9b65(0x2cd)](_0x5411cf);},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x2c0)]=function(_0x15094b){const _0x3cb7c8=_0x12ccb4;this[_0x3cb7c8(0x313)]--,this[_0x3cb7c8(0x313)]<=0x0&&(this[_0x3cb7c8(0x1a6)](_0x15094b),Window_Base[_0x3cb7c8(0x270)][_0x3cb7c8(0x2c0)][_0x3cb7c8(0x17c)](this,_0x15094b));},Window_Message[_0x12ccb4(0x270)]['onProcessCharacter']=function(_0x151c79){const _0x18dfdf=_0x12ccb4;this[_0x18dfdf(0x313)]=this[_0x18dfdf(0x36b)];if(this[_0x18dfdf(0x36b)]<=0x0)this[_0x18dfdf(0x280)]=!![];},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x204)]=Window_Message['prototype'][_0x12ccb4(0x28d)],Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x28d)]=function(_0x924bd3,_0x54e7ea){const _0x1adf45=_0x12ccb4;!_0x54e7ea[_0x1adf45(0x23f)]?Window_Base['prototype'][_0x1adf45(0x28d)]['call'](this,_0x924bd3,_0x54e7ea):VisuMZ[_0x1adf45(0x2c5)][_0x1adf45(0x204)]['call'](this,_0x924bd3,_0x54e7ea);},Window_Message[_0x12ccb4(0x270)]['prepareAutoSizeEscapeCharacters']=function(_0x21534a){const _0x1eb418=_0x12ccb4;let _0x5c09e7=_0x21534a[_0x1eb418(0x27e)];_0x5c09e7=_0x5c09e7[_0x1eb418(0x310)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x3ac145=_0x1eb418;return this['processAutoSize'](_0x5c09e7,!![],!![]),this[_0x3ac145(0x32b)](_0x3ac145(0x1d9)),'';}),_0x5c09e7=_0x5c09e7['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x84b86f=_0x1eb418;return this[_0x84b86f(0x36d)](_0x5c09e7,!![],![]),this[_0x84b86f(0x32b)](_0x84b86f(0x1d9)),'';}),_0x5c09e7=_0x5c09e7[_0x1eb418(0x310)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x2905bf=_0x1eb418;return this[_0x2905bf(0x36d)](_0x5c09e7,![],!![]),this[_0x2905bf(0x32b)](_0x2905bf(0x1d9)),'';});if(SceneManager[_0x1eb418(0x2e5)]())_0x5c09e7=_0x5c09e7[_0x1eb418(0x310)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x20fe36,_0x3398c0)=>{const _0xc54b68=_0x1eb418;return this[_0xc54b68(0x36d)](_0x5c09e7,!![],!![]),this[_0xc54b68(0x32b)](_0xc54b68(0x236),Number(_0x3398c0)||0x1),'';}),_0x5c09e7=_0x5c09e7['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x397f8d,_0x7f8d0a)=>{const _0xd4a347=_0x1eb418;return this[_0xd4a347(0x36d)](_0x5c09e7,!![],!![]),this[_0xd4a347(0x32b)](_0xd4a347(0x351),Number(_0x7f8d0a)||0x0),'';}),_0x5c09e7=_0x5c09e7[_0x1eb418(0x310)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x159306,_0x2b9b10)=>{const _0x125646=_0x1eb418;return this[_0x125646(0x36d)](_0x5c09e7,!![],!![]),this['processAutoPosition'](_0x125646(0x2be),Number(_0x2b9b10)||0x0),'';});else SceneManager[_0x1eb418(0x241)]()&&(_0x5c09e7=_0x5c09e7[_0x1eb418(0x310)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x3fc067,_0xbeda81)=>{const _0x488f66=_0x1eb418;return this[_0x488f66(0x36d)](_0x5c09e7,!![],!![]),this[_0x488f66(0x32b)](_0x488f66(0x1bf),0x0),'';}),_0x5c09e7=_0x5c09e7['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x36de41,_0x3cb216)=>{const _0x4853b5=_0x1eb418;return this[_0x4853b5(0x36d)](_0x5c09e7,!![],!![]),this['processAutoPosition'](_0x4853b5(0x300),Number(_0x3cb216)||0x1),'';}),_0x5c09e7=_0x5c09e7['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x277d54,_0x1da5a4)=>{const _0x24334c=_0x1eb418;return this[_0x24334c(0x36d)](_0x5c09e7,!![],!![]),this[_0x24334c(0x32b)](_0x24334c(0x257),Number(_0x1da5a4)||0x0),'';}),_0x5c09e7=_0x5c09e7[_0x1eb418(0x310)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x940de6,_0x3c0686)=>{const _0x181dc0=_0x1eb418;return this[_0x181dc0(0x36d)](_0x5c09e7,!![],!![]),this[_0x181dc0(0x32b)](_0x181dc0(0x1e1),Number(_0x3c0686)||0x0),'';}));_0x21534a['text']=_0x5c09e7;},Window_Message[_0x12ccb4(0x272)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x12ccb4(0x2f0)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x12ccb4(0x36d)]=function(_0x2cf1e6,_0x19709d,_0x5246fe){const _0x1fc017=_0x12ccb4;_0x2cf1e6=_0x2cf1e6[_0x1fc017(0x310)](Window_Message['_autoSizeRegexp'],''),_0x2cf1e6=_0x2cf1e6[_0x1fc017(0x310)](Window_Message[_0x1fc017(0x2f0)],''),this[_0x1fc017(0x25a)]=!![];const _0x2f59dd=this[_0x1fc017(0x305)](_0x2cf1e6);if(_0x19709d){let _0x388867=_0x2f59dd[_0x1fc017(0x345)]+$gameSystem[_0x1fc017(0x390)]()*0x2+0x6;const _0x1c60a5=$gameMessage[_0x1fc017(0x29c)]()!=='',_0x5aca74=ImageManager[_0x1fc017(0x200)],_0x191cad=0x14;_0x388867+=_0x1c60a5?_0x5aca74+_0x191cad:0x4;if(_0x388867%0x2!==0x0)_0x388867+=0x1;$gameSystem[_0x1fc017(0x357)](_0x388867);}if(_0x5246fe){let _0x35786d=Math[_0x1fc017(0x301)](_0x2f59dd[_0x1fc017(0x2d1)]/this[_0x1fc017(0x21a)]());$gameSystem['setMessageWindowRows'](_0x35786d);}this[_0x1fc017(0x1f2)](),this[_0x1fc017(0x25a)]=![],this[_0x1fc017(0x34a)]=!![];},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x1f2)]=function(){const _0x3f065a=_0x12ccb4;this[_0x3f065a(0x1c4)](),this[_0x3f065a(0x369)](),this[_0x3f065a(0x1fe)](),this[_0x3f065a(0x263)](),this[_0x3f065a(0x2ee)][_0x3f065a(0x2a8)](),this[_0x3f065a(0x1ff)]();},Window_Message['prototype'][_0x12ccb4(0x32b)]=function(_0x45032a,_0x5d0ee9){const _0x5104d9=_0x12ccb4;switch(_0x45032a['toLowerCase']()[_0x5104d9(0x2b1)]()){case _0x5104d9(0x236):this[_0x5104d9(0x31c)]=$gameActors[_0x5104d9(0x2a7)](_0x5d0ee9);break;case _0x5104d9(0x351):this['_autoPositionTarget']=$gameParty['members']()[_0x5d0ee9-0x1];break;case _0x5104d9(0x2be):this['_autoPositionTarget']=$gameTroop[_0x5104d9(0x29a)]()[_0x5d0ee9-0x1];break;case _0x5104d9(0x1bf):this[_0x5104d9(0x31c)]=$gamePlayer;break;case'map\x20actor':const _0x232b68=$gameActors[_0x5104d9(0x2a7)](_0x5d0ee9)[_0x5104d9(0x22d)]();_0x232b68===0x0?this[_0x5104d9(0x31c)]=$gamePlayer:this[_0x5104d9(0x31c)]=$gamePlayer[_0x5104d9(0x2ec)]()['follower'](_0x232b68-0x1);break;case _0x5104d9(0x257):_0x5d0ee9===0x1?this[_0x5104d9(0x31c)]=$gamePlayer:this['_autoPositionTarget']=$gamePlayer[_0x5104d9(0x2ec)]()[_0x5104d9(0x29d)](_0x5d0ee9-0x2);break;case _0x5104d9(0x1e1):this[_0x5104d9(0x31c)]=$gameMap[_0x5104d9(0x1cc)](_0x5d0ee9);break;}this[_0x5104d9(0x31c)]&&this['updateAutoPosition']();},VisuMZ['MessageCore'][_0x12ccb4(0x338)]=Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x240)],Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x240)]=function(){const _0x37c018=_0x12ccb4;this[_0x37c018(0x341)](),VisuMZ[_0x37c018(0x2c5)][_0x37c018(0x338)]['call'](this);},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x341)]=function(){const _0x15ee39=_0x12ccb4;if(!this[_0x15ee39(0x31c)])return;const _0x562771=SceneManager[_0x15ee39(0x376)];if(!_0x562771)return;if(!_0x562771[_0x15ee39(0x2e8)])return;const _0x58240b=_0x562771[_0x15ee39(0x2e8)][_0x15ee39(0x274)](this[_0x15ee39(0x31c)]);if(!_0x58240b)return;let _0xacf56f=_0x58240b['x'];_0xacf56f-=this['width']/0x2,_0xacf56f-=(Graphics[_0x15ee39(0x345)]-Graphics[_0x15ee39(0x24c)])/0x2;let _0x239671=_0x58240b['y'];_0x239671-=this[_0x15ee39(0x2d1)],_0x239671-=(Graphics[_0x15ee39(0x2d1)]-Graphics['boxHeight'])/0x2,_0x239671-=_0x58240b[_0x15ee39(0x2d1)]+0x8,this['x']=Math[_0x15ee39(0x366)](_0xacf56f),this['y']=Math[_0x15ee39(0x366)](_0x239671),this[_0x15ee39(0x255)](!![],![]),this['_nameBoxWindow'][_0x15ee39(0x369)]();},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x23a)]=function(){const _0x3eeaf7=_0x12ccb4;this[_0x3eeaf7(0x34a)]=![],this[_0x3eeaf7(0x31c)]=undefined,$gameSystem['initMessageCore'](),this[_0x3eeaf7(0x1f2)](),this[_0x3eeaf7(0x2aa)]=0x0;},Window_Message[_0x12ccb4(0x270)]['preConvertEscapeCharacters']=function(_0x5da94d){const _0x3f22dc=_0x12ccb4;return Window_Base['prototype'][_0x3f22dc(0x247)]['call'](this,_0x5da94d);},Window_Message['prototype'][_0x12ccb4(0x1a5)]=function(_0x4a5b22){const _0x15e021=_0x12ccb4;return Window_Base['prototype'][_0x15e021(0x1a5)]['call'](this,_0x4a5b22);},Window_Message['prototype'][_0x12ccb4(0x2e0)]=function(_0xaabe98){const _0x1d8aac=_0x12ccb4;this[_0x1d8aac(0x219)](_0xaabe98),Window_Base[_0x1d8aac(0x270)][_0x1d8aac(0x2e0)]['call'](this,_0xaabe98),this['postFlushTextState'](_0xaabe98);},Window_Message[_0x12ccb4(0x270)]['preFlushTextState']=function(_0x38c3d2){},Window_Message[_0x12ccb4(0x270)][_0x12ccb4(0x2a3)]=function(_0x2f653f){},Window_NameBox['prototype']['isAutoColorAffected']=function(){return![];},Window_NameBox[_0x12ccb4(0x270)]['resetTextColor']=function(){const _0x48f224=_0x12ccb4;Window_Base[_0x48f224(0x270)][_0x48f224(0x34c)][_0x48f224(0x17c)](this),this['changeTextColor'](this['defaultColor']());},Window_NameBox[_0x12ccb4(0x270)][_0x12ccb4(0x1a2)]=function(){const _0x1c001e=_0x12ccb4,_0x15fc52=VisuMZ[_0x1c001e(0x2c5)]['Settings'][_0x1c001e(0x18e)][_0x1c001e(0x224)];return ColorManager[_0x1c001e(0x230)](_0x15fc52);},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x385)]=Window_NameBox[_0x12ccb4(0x270)][_0x12ccb4(0x369)],Window_NameBox[_0x12ccb4(0x270)]['updatePlacement']=function(){const _0x15cf36=_0x12ccb4;VisuMZ['MessageCore']['Window_NameBox_updatePlacement']['call'](this),this['updateRelativePosition'](),this[_0x15cf36(0x2a1)](),this['clampPlacementPosition'](),this['updateOverlappingY']();},Window_NameBox[_0x12ccb4(0x270)]['preConvertEscapeCharacters']=function(_0x403d53){const _0x310861=_0x12ccb4;return _0x403d53=_0x403d53[_0x310861(0x310)](/<LEFT>/gi,this[_0x310861(0x202)]['bind'](this,0x0)),_0x403d53=_0x403d53[_0x310861(0x310)](/<CENTER>/gi,this[_0x310861(0x202)][_0x310861(0x1b9)](this,0x5)),_0x403d53=_0x403d53[_0x310861(0x310)](/<RIGHT>/gi,this[_0x310861(0x202)][_0x310861(0x1b9)](this,0xa)),_0x403d53=_0x403d53['replace'](/<POSITION:[ ](\d+)>/gi,(_0x301462,_0x28ca24)=>this['setRelativePosition'](parseInt(_0x28ca24))),_0x403d53=_0x403d53[_0x310861(0x310)](/<\/LEFT>/gi,''),_0x403d53=_0x403d53[_0x310861(0x310)](/<\/CENTER>/gi,''),_0x403d53=_0x403d53[_0x310861(0x310)](/<\/RIGHT>/gi,''),Window_Base[_0x310861(0x270)][_0x310861(0x247)][_0x310861(0x17c)](this,_0x403d53);},Window_NameBox['prototype'][_0x12ccb4(0x202)]=function(_0x2a985b){const _0x1742d1=_0x12ccb4;return this[_0x1742d1(0x299)]=_0x2a985b,'';},Window_NameBox[_0x12ccb4(0x270)][_0x12ccb4(0x2d6)]=function(){const _0x2d1cc4=_0x12ccb4;if($gameMessage['isRTL']())return;this[_0x2d1cc4(0x299)]=this[_0x2d1cc4(0x299)]||0x0;const _0x549509=this[_0x2d1cc4(0x36a)],_0xf1fd6a=Math[_0x2d1cc4(0x38f)](_0x549509[_0x2d1cc4(0x345)]*this[_0x2d1cc4(0x299)]/0xa);this['x']=_0x549509['x']+_0xf1fd6a-Math[_0x2d1cc4(0x38f)](this[_0x2d1cc4(0x345)]/0x2),this['x']=this['x'][_0x2d1cc4(0x1c2)](_0x549509['x'],_0x549509['x']+_0x549509[_0x2d1cc4(0x345)]-this[_0x2d1cc4(0x345)]);},Window_NameBox[_0x12ccb4(0x270)][_0x12ccb4(0x2a1)]=function(){const _0x3de01c=_0x12ccb4;if($gameMessage['isRTL']())return;this['_relativePosition']=this[_0x3de01c(0x299)]||0x0;const _0x284a90=VisuMZ[_0x3de01c(0x2c5)]['Settings']['General'][_0x3de01c(0x1e9)],_0x4a3116=VisuMZ[_0x3de01c(0x2c5)][_0x3de01c(0x289)]['General'][_0x3de01c(0x2f6)],_0x4a4cd9=(0x5-this[_0x3de01c(0x299)])/0x5;this['x']+=Math[_0x3de01c(0x38f)](_0x284a90*_0x4a4cd9),this['y']+=_0x4a3116;},Window_NameBox[_0x12ccb4(0x270)]['updateOverlappingY']=function(){const _0x2ffddc=_0x12ccb4,_0x3cd7b3=this[_0x2ffddc(0x36a)],_0x6d48ec=_0x3cd7b3['y'],_0x1b8b75=VisuMZ[_0x2ffddc(0x2c5)]['Settings'][_0x2ffddc(0x18e)]['NameBoxWindowOffsetY'];_0x6d48ec>this['y']&&_0x6d48ec<this['y']+this['height']-_0x1b8b75&&(this['y']=_0x3cd7b3['y']+_0x3cd7b3[_0x2ffddc(0x2d1)]);},VisuMZ[_0x12ccb4(0x2c5)]['Window_NameBox_refresh']=Window_NameBox[_0x12ccb4(0x270)][_0x12ccb4(0x1db)],Window_NameBox['prototype'][_0x12ccb4(0x1db)]=function(){const _0x3e801e=_0x12ccb4;this[_0x3e801e(0x299)]=0x0,VisuMZ[_0x3e801e(0x2c5)][_0x3e801e(0x2b6)][_0x3e801e(0x17c)](this);},Window_ChoiceList['prototype']['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x12ccb4(0x270)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList['prototype']['lineHeight']=function(){const _0x8e22fc=_0x12ccb4;return $gameSystem[_0x8e22fc(0x20c)]();},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x32d)]=function(){const _0x50004c=_0x12ccb4;return $gameSystem[_0x50004c(0x2cc)]();},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x30f)]=function(){const _0x1f0bef=_0x12ccb4;this[_0x1f0bef(0x1db)](),this[_0x1f0bef(0x1b1)](),this[_0x1f0bef(0x358)](),this[_0x1f0bef(0x2ad)]();},Window_ChoiceList[_0x12ccb4(0x270)]['refresh']=function(){const _0xee8bad=_0x12ccb4;this[_0xee8bad(0x1aa)](),this[_0xee8bad(0x192)](),this[_0xee8bad(0x36a)]&&(this[_0xee8bad(0x369)](),this[_0xee8bad(0x22f)]()),this[_0xee8bad(0x1ff)](),this[_0xee8bad(0x22a)](),this['refreshDimmerBitmap'](),Window_Selectable['prototype'][_0xee8bad(0x1db)]['call'](this);},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x192)]=function(){const _0x36ce46=_0x12ccb4,_0x3a707b=$gameMessage[_0x36ce46(0x33f)]();let _0x5f55c8=0x0;for(const _0x3387d1 of _0x3a707b){if(this[_0x36ce46(0x30b)](_0x3387d1)){const _0x1b893c=_0x3387d1,_0x45e93c=this[_0x36ce46(0x393)](_0x3387d1);this['addCommand'](_0x1b893c,_0x36ce46(0x25c),_0x45e93c,_0x5f55c8);}_0x5f55c8++;}},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x30b)]=function(_0x35f79d){const _0x19bc91=_0x12ccb4;if(_0x35f79d[_0x19bc91(0x362)](/<HIDE>/i))return![];if(_0x35f79d[_0x19bc91(0x362)](/<SHOW>/i))return!![];if(_0x35f79d[_0x19bc91(0x362)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4253df=JSON['parse']('['+RegExp['$1'][_0x19bc91(0x362)](/\d+/g)+']');for(const _0x1a916a of _0x4253df){if(!$gameSwitches[_0x19bc91(0x18b)](_0x1a916a))return![];}return!![];}if(_0x35f79d[_0x19bc91(0x362)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x21306d=JSON[_0x19bc91(0x35b)]('['+RegExp['$1'][_0x19bc91(0x362)](/\d+/g)+']');for(const _0x505b3e of _0x21306d){if(!$gameSwitches['value'](_0x505b3e))return![];}return!![];}if(_0x35f79d['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1402af=JSON[_0x19bc91(0x35b)]('['+RegExp['$1'][_0x19bc91(0x362)](/\d+/g)+']');for(const _0xa11359 of _0x1402af){if($gameSwitches['value'](_0xa11359))return!![];}return![];}if(_0x35f79d[_0x19bc91(0x362)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32ac74=JSON[_0x19bc91(0x35b)]('['+RegExp['$1'][_0x19bc91(0x362)](/\d+/g)+']');for(const _0x7a4e91 of _0x32ac74){if(!$gameSwitches[_0x19bc91(0x18b)](_0x7a4e91))return!![];}return![];}if(_0x35f79d[_0x19bc91(0x362)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11cfce=JSON[_0x19bc91(0x35b)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x15405b of _0x11cfce){if(!$gameSwitches[_0x19bc91(0x18b)](_0x15405b))return!![];}return![];}if(_0x35f79d[_0x19bc91(0x362)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x815949=JSON[_0x19bc91(0x35b)]('['+RegExp['$1'][_0x19bc91(0x362)](/\d+/g)+']');for(const _0x38126e of _0x815949){if($gameSwitches[_0x19bc91(0x18b)](_0x38126e))return![];}return!![];}return!![];},Window_ChoiceList['prototype'][_0x12ccb4(0x393)]=function(_0x21df6e){const _0x32cc8d=_0x12ccb4;if(_0x21df6e[_0x32cc8d(0x362)](/<DISABLE>/i))return![];if(_0x21df6e[_0x32cc8d(0x362)](/<ENABLE>/i))return!![];if(_0x21df6e[_0x32cc8d(0x362)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b809b=JSON['parse']('['+RegExp['$1'][_0x32cc8d(0x362)](/\d+/g)+']');for(const _0xfeaaab of _0x2b809b){if(!$gameSwitches[_0x32cc8d(0x18b)](_0xfeaaab))return![];}return!![];}if(_0x21df6e[_0x32cc8d(0x362)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x255920=JSON[_0x32cc8d(0x35b)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x479a09 of _0x255920){if(!$gameSwitches[_0x32cc8d(0x18b)](_0x479a09))return![];}return!![];}if(_0x21df6e[_0x32cc8d(0x362)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x221670=JSON[_0x32cc8d(0x35b)]('['+RegExp['$1'][_0x32cc8d(0x362)](/\d+/g)+']');for(const _0x17efdb of _0x221670){if($gameSwitches[_0x32cc8d(0x18b)](_0x17efdb))return!![];}return![];}if(_0x21df6e[_0x32cc8d(0x362)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5adbd0=JSON[_0x32cc8d(0x35b)]('['+RegExp['$1'][_0x32cc8d(0x362)](/\d+/g)+']');for(const _0x6effd6 of _0x5adbd0){if(!$gameSwitches['value'](_0x6effd6))return!![];}return![];}if(_0x21df6e[_0x32cc8d(0x362)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x198ae2=JSON[_0x32cc8d(0x35b)]('['+RegExp['$1'][_0x32cc8d(0x362)](/\d+/g)+']');for(const _0x441d6d of _0x198ae2){if(!$gameSwitches[_0x32cc8d(0x18b)](_0x441d6d))return!![];}return![];}if(_0x21df6e[_0x32cc8d(0x362)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x527fcd=JSON['parse']('['+RegExp['$1'][_0x32cc8d(0x362)](/\d+/g)+']');for(const _0x10581a of _0x527fcd){if($gameSwitches[_0x32cc8d(0x18b)](_0x10581a))return![];}return!![];}return!![];},VisuMZ[_0x12ccb4(0x2c5)]['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x12ccb4(0x270)]['updatePlacement'],Window_ChoiceList['prototype'][_0x12ccb4(0x369)]=function(){const _0x4aade1=_0x12ccb4;VisuMZ['MessageCore'][_0x4aade1(0x2bb)]['call'](this),this[_0x4aade1(0x255)]();},Window_ChoiceList[_0x12ccb4(0x270)]['placeCancelButton']=function(){const _0x132640=_0x12ccb4;if(!this[_0x132640(0x1b4)])return;const _0x3b5ff4=0x8,_0x530f2f=this['_cancelButton'],_0x2edc10=this['x']+this['width'],_0x120c06=Math['floor']((Graphics['width']-Graphics[_0x132640(0x24c)])/0x2);_0x2edc10>=Graphics[_0x132640(0x24c)]+_0x120c06-_0x530f2f['width']+_0x3b5ff4?_0x530f2f['x']=-_0x530f2f[_0x132640(0x345)]-_0x3b5ff4:_0x530f2f['x']=this['width']+_0x3b5ff4,_0x530f2f['y']=this[_0x132640(0x2d1)]/0x2-_0x530f2f[_0x132640(0x2d1)]/0x2;},VisuMZ[_0x12ccb4(0x2c5)][_0x12ccb4(0x2ae)]=Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x251)],Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x251)]=function(){const _0x58156e=_0x12ccb4;return this['_messageWindow']?this['messageCoreWindowX']():VisuMZ['MessageCore'][_0x58156e(0x2ae)][_0x58156e(0x17c)](this);},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x235)]=function(){const _0xeed80=_0x12ccb4,_0x485dc4=$gameMessage[_0xeed80(0x32a)]();if(_0x485dc4===0x1)return(Graphics[_0xeed80(0x24c)]-this['windowWidth']())/0x2;else return _0x485dc4===0x2?this[_0xeed80(0x36a)]['x']+this[_0xeed80(0x36a)][_0xeed80(0x345)]-this[_0xeed80(0x2cf)]():this[_0xeed80(0x36a)]['x'];},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x2cf)]=function(){const _0x363a7f=_0x12ccb4,_0x54cabb=(this['maxChoiceWidth']()+this[_0x363a7f(0x33e)]())*this[_0x363a7f(0x32d)]()+this[_0x363a7f(0x29b)]*0x2;return Math[_0x363a7f(0x378)](_0x54cabb,Graphics[_0x363a7f(0x345)]);},Window_ChoiceList['prototype']['numVisibleRows']=function(){const _0x559cd7=_0x12ccb4,_0x1081bc=$gameMessage[_0x559cd7(0x33f)]()[_0x559cd7(0x24d)](_0x1d2aa4=>this[_0x559cd7(0x30b)](_0x1d2aa4)),_0x2df752=Math[_0x559cd7(0x301)](_0x1081bc['length']/this[_0x559cd7(0x32d)]());return Math[_0x559cd7(0x31a)](0x1,Math[_0x559cd7(0x378)](_0x2df752,this[_0x559cd7(0x25d)]()));},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x25d)]=function(){const _0x1c99d5=_0x12ccb4,_0x307926=this['_messageWindow'],_0x18b309=_0x307926?_0x307926['y']:0x0,_0x24f8b9=_0x307926?_0x307926[_0x1c99d5(0x2d1)]:0x0,_0x429c37=Graphics[_0x1c99d5(0x2db)]/0x2;return _0x18b309<_0x429c37&&_0x18b309+_0x24f8b9>_0x429c37?0x4:$gameSystem[_0x1c99d5(0x318)]();},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x1e7)]=function(){const _0x47ef18=_0x12ccb4;let _0x411950=0x60;for(const _0xce227f of this['_list']){const _0xf8337a=_0xce227f['name'],_0x472f79=this[_0x47ef18(0x305)](_0xf8337a)[_0x47ef18(0x345)],_0x5b71f2=Math[_0x47ef18(0x301)](_0x472f79)+this['itemPadding']()*0x2;_0x411950<_0x5b71f2&&(_0x411950=_0x5b71f2);}return _0x411950;},Window_ChoiceList[_0x12ccb4(0x270)][_0x12ccb4(0x212)]=function(_0x168dc0){const _0x2e41bc=_0x12ccb4,_0x5b3dd3=this[_0x2e41bc(0x365)](_0x168dc0),_0x1996ec=$gameSystem[_0x2e41bc(0x266)]()!==_0x2e41bc(0x1d8)?_0x2e41bc(0x38c)[_0x2e41bc(0x308)]($gameSystem[_0x2e41bc(0x266)]()):'',_0x213d40=_0x1996ec+this[_0x2e41bc(0x1f7)](_0x168dc0);this[_0x2e41bc(0x25e)](this[_0x2e41bc(0x23e)](_0x168dc0)),this[_0x2e41bc(0x265)](_0x213d40,_0x5b3dd3['x'],_0x5b3dd3['y'],_0x5b3dd3['width']);},Window_ChoiceList['prototype'][_0x12ccb4(0x29f)]=function(){const _0x18e7cd=_0x12ccb4;$gameMessage['onChoice'](this['currentExt']()),this[_0x18e7cd(0x36a)][_0x18e7cd(0x21c)](),this['close']();};