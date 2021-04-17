//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.15] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x666a=['actorId','Sprite_StateIcon_updateFrame','height','allowCreateShopStatusWindow','resetStateCounts','539395bNixGi','MAXMP','MaxTurns','Game_Battler_addBuff','convertPassiveStates','NEGATIVE','Settings','isUseModernControls','createCommandNameWindow','innerHeight','setStatusWindow','ParseStateNotetags','_checkingPassiveStates','ANY','buttonAssistText1','ALL','adjustItemWidthByShopStatus','createShopStatusWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ColorNeutral','lineHeight','endAction','skillTpCost','toLowerCase','ParseAllNotetags','Game_Battler_regenerateAll','ColorBuff','441676ELTjoW','MAT','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','mainFontSize','Parse_Notetags_Skill_JS','iconWidth','drawFullGauge','_scene','ColorNegative','_checkingVisuMzPassiveStateObjects','makeAdditionalSkillCostText','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','maxSlipDamage','getCurrentStateActiveUser','statePassiveConditionJS','drawTextEx','getStateIdWithName','getStateRetainType','ARRAYFUNC','mainAreaHeight','checkShowHideNotetags','getStateOrigin','HiddenSkillTypes','uiHelpPosition','multiclasses','onExpireDebuff','_categoryWindow','useDigitGrouping','makeCommandName','iconIndex','LayoutStyle','stateExpireJS','SkillConditionJS','stateMpSlipDamageJS','_stateDisplay','map','Window_StatusBase_drawActorIcons','onExpireDebuffJS','debuffColor','onAddStateJS','drawText','Game_Battler_addState','clearStateDisplay','GaugeCurrentJS','ignore','DataOffsetY','_skillTypeWindow','_classIDs','setBackgroundType','Skills','onEraseStateCustomJS','LUK','onExpireState','fontBold','onAddBuffJS','VisuMZ_1_ElementStatusCore','<troop-%1>','FUNC','setup','redraw','menuActor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','length','\x5cI[%1]%2','filter','onAddStateCustomJS','Game_BattlerBase_skillMpCost','clearStatesWithStateRetain','increaseBuff','prototype','inBattle','Window_SkillList_updateHelp','skillEnableJS','statusWidth','drawItemStyleIcon','meetsSkillConditionsEnableJS','addPassiveStatesByPluginParameters','_stateIDs','removeState','groupDefeat','updateStateTurns','addState','usableSkills','Window_SkillList_includes','regenerateAllSkillsStatesCore','isStateRestrict','_currentActor','trim','debuffTurns','gainMp','Game_Actor_forgetSkill','stateHpSlipDamageJS','gainHp','setStateTurns','updateStatesActionEnd','createAllSkillCostText','parse','States','isPlaytest','makeSuccess','checkSkillConditionsSwitchNotetags','convertGaugeTypeSkillsStatesCore','commandStyleCheck','onExpireStateCustomJS','Window_SkillList_setActor','meetsPassiveStateConditionJS','_tempBattler','Window_StatusBase_placeGauge','isUseSkillsStatesCoreUpdatedLayout','buffTurns','changeOutlineColor','sort','reset','helpWindowRect','ListWindowCols','SkillSceneStatusBgType','_subject','checkCacheKey','_stateOrigin','none','DEF','313kyDzyF','_cache','passiveStateObjects','checkSkillConditionsNotetags','_stateMaxTurns','Game_BattlerBase_buffIconIndex','stypeId','clamp','_costSettings','onExpireBuff','iconHeight','drawActorStateData','maxCols','heal','recalculateSlipDamageJS','gaugeLineHeight','VisuMZ_1_MainMenuCore','stateColor','meetsPassiveStateConditions','paramValueByName','checkShowHideSkillNotetags','actions','Game_Unit_isAllDead','IconStypeNorm','bitmap','CanPayJS','_shopStatusWindow','setStateRetainType','initialize','drawActorBuffTurns','onAddStateGlobalJS','floor','convertTargetToStateOriginKey','1284069sWyMkp','Game_BattlerBase_initMembers','statesByCategory','isStateExpired','scrollTo','commandNameWindowDrawBackground','skillMpCost','_hidden','drawSkillCost','_stateData','states','ShowData','StackDebuffMax','ColorDebuff','_skillIDs','Costs','indexOf','changePaintOpacity','onExpireDebuffGlobalJS','1200739nEQFdo','Game_BattlerBase_refresh','onEraseBuff','_buffTurns','remove','addStateTurns','autoRemovalTiming','skillVisibleJS','removeBuffsAuto','Scene_Skill_helpWindowRect','_buffs','getStateReapplyRulings','%1\x20%2\x20%3','setItem','currentMaxValue','eraseState','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','passiveStates','isPartyAllAffectedByGroupDefeatStates','buffColor','TurnFontSize','updatedLayoutStyle','Global','onEraseBuffGlobalJS','MultiplierJS','onAddDebuff','clearStateData','meetsPassiveStateGlobalConditionJS','callUpdateHelp','addChild','SkillMenuStatusRect','addBuffTurns','replace','createTurnDisplaySprite','removeStatesByCategory','outlineColor','_stateTurns','user','Sprite_StateIcon_loadBitmap','text','AGI','onAddStateMakeCustomSlipValues','slipMp','drawActorStateTurns','number','Game_BattlerBase_decreaseBuff','description','recover\x20all','setStypeId','BattleManager_endAction','skills','Game_BattlerBase_increaseBuff','uiMenuStyle','updateFrame','frameCount','_colorCache','initMembers','MDF','stateAddJS','drawActorIconsAllTurnCounters','EVAL','damage','status','fontFace','ParseSkillNotetags','center','commandNameWindowDrawText','ceil','Parse_Notetags_State_Category','Game_BattlerBase_recoverAll','onExpireStateGlobalJS','Scene_Skill_statusWindowRect','getSkillTypes','Parse_Notetags_State_ApplyRemoveLeaveJS','isSkillCostShown','parameters','Sprite_Gauge_currentValue','ARRAYSTRUCT','<member-%1>','JSON','mainAreaTop','textSizeEx','meetsSkillConditions','setStateDisplay','allIcons','_stored_debuffColor','_tempActor','Game_Action_applyItemUserEffect','Game_BattlerBase_eraseState','Sprite_Gauge_initMembers','onAddDebuffGlobalJS','actor','commandStyle','meetsSkillConditionsGlobalJS','Window_SkillList_maxCols','exit','currentDisplayedValue','TurnOffsetX','retrieveStateColor','_turnDisplaySprite','placeExactGauge','VisuMZ_0_CoreEngine','Scene_Skill_itemWindowRect','stateMaximumTurns','meetsPassiveStateConditionClasses','_stypeId','_stypeIDs','Parse_Notetags_State_PassiveJS','drawActorIcons','gainSilentTp','decreaseBuff','shopStatusWindowRectSkillsStatesCore','5ssqXQS','onRemoveState','getColor','_currentTroopUniqueID','clearStateRetainType','Game_BattlerBase_overwriteBuffTurns','paramBuffRate','isStateAffected','clearStates','onAddBuffGlobalJS','stateEraseJS','includesSkillsStatesCore','ShowTurns','isBuffExpired','includes','onExpireBuffGlobalJS','ARRAYJSON','keys','helpWindowRectSkillsStatesCore','getStypeIdWithName','isAlive','maxItems','format','add','getStateDisplay','ReapplyRules','isRightInputMode','canUse','ConvertParams','ARRAYNUM','Enemy','onExpireBuffJS','uiInputPosition','Game_BattlerBase_die','stateId','isGroupDefeatStateAffected','%1%','onEraseStateGlobalJS','untitled','PassiveConditionJS','1bYbANQ','updateTurnDisplaySprite','TurnOffsetY','totalStateCategory','setStateOrigin','7620NsCapx','isSkillUsableForAutoBattle','Game_BattlerBase_eraseBuff','process_VisuMZ_SkillsStatesCore_State_Notetags','buffIconIndex','log','Sprite_Gauge_currentMaxValue','contents','PassiveStates','isCommandEnabled','statusWindowRectSkillsStatesCore','isAllDead','GaugeDrawJS','canPaySkillCost','updateCommandNameWindow','auto','colSpacing','currentMaxValueSkillsStatesCore','anchor','isBuffAffected','learnSkill','CalcJS','applyStateTurnManipulationEffects','skillTypeWindowRect','applyDebuffTurnManipulationEffects','stateMpSlipHealJS','forgetSkill','max','addPassiveStatesFromOtherPlugins','StackBuffMax','totalStateCategoryAffected','hide','onDatabaseLoaded','hasSkill','changeTextColor','isPassiveStateStackable','textColor','members','itemAt','STRUCT','itemWindowRect','Sprite_Gauge_setup','SkillsStatesCore','commandNameWindowCenter','removeStatesAuto','itemWindowRectSkillsStatesCore','MAXHP','checkShowHideJS','setDebuffTurns','onEraseDebuffJS','concat','refresh','currentClass','placeGauge','clear','success','stateData','test','ShowJS','meetsStateCondition','greater','Sprite_Gauge_gaugeRate','GroupDigits','onAddState','mainCommandWidth','innerWidth','getCurrentTroopUniqueID','toUpperCase','stateTpSlipHealJS','item','_actor','ARRAYSTR','Name','VisuMZ_2_ClassChangeSystem','_stored_state-%1-color','mainFontFace','enemy','regenerateAll','drawActorBuffRates','drawExtendedSkillsStatesCoreStatus','shopStatusWindowRect','Game_BattlerBase_states','process_VisuMZ_SkillsStatesCore_Notetags','gradientFillRect','4547tlCLkO','clearStateOrigin','active','removeStatesByCategoryAll','363107SAyUkK','rgba(0,\x200,\x200,\x201)','index','drawItemStyleIconText','skill','skillTypes','isBuffOrDebuffAffected','overwriteBuffTurns','initMembersSkillsStatesCore','drawItem','value','helpAreaTop','onAddDebuffJS','drawExtendedParameter','onEraseBuffJS','POSITIVE','skillCostSeparator','onEraseDebuff','Game_BattlerBase_clearStates','ActionEndUpdate','VisuMZ_1_ItemsEquipsCore','isDebuffAffected','hasStateCategory','CmdTextAlign','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','die','shopStatusWidth','priority','_commandNameWindow','_result','_battler','STR','Scene_Skill_createItemWindow','redrawSkillsStatesCore','addBuff','mpCost','hasState','stateHpSlipHealJS','iconText','Game_Troop_setup','Param','makeCommandList','onEraseDebuffGlobalJS','Game_BattlerBase_resetStateCounts','addDebuffTurns','shift','addDebuff','applyStateCategoryRemovalEffects','state','updateHelp','call','Buffs','isLearnedSkill','width','canClearState','IconStypeMagic','eraseBuff','boxWidth','checkShowHideBattleNotetags','meetsPassiveStateConditionSwitches','PayJS','stateTpSlipDamageJS','getSkillIdWithName','isMaxDebuffAffected','push','#%1','_itemWindow','loadBitmap','isStateRemoved','itemLineRect','CmdStyle','Game_Actor_learnSkill','drawIcon','helpAreaHeight','death','Scene_Boot_onDatabaseLoaded','ParseClassIDs','getColorDataFromPluginParameters','Game_BattlerBase_meetsSkillConditions','_statusWindow','DataOffsetX','icon','Parse_Notetags_Skill_Cost','118Bmpbxt','removeBuff','applySkillsStatesCoreEffects','makeCurrentTroopUniqueID','ShowShopStatus','isBuffPrevented','isActor','Game_Battler_isStateAddable','recoverAll','_states','addPassiveStatesByNotetag','Window_SkillType_initialize','slipTp','onRegenerateCustomStateDamageOverTime','Parse_Notetags_State_SlipEffectJS','Sprite_Gauge_redraw','gaugeRate','Game_BattlerBase_skillTpCost','resetTextColor','fontSize','checkSkillTypeMatch','currentValue','Game_Actor_skillTypes','categories','DisplayedParams','skillTypeWindowRectSkillsStatesCore','setActor','setBuffTurns','addPassiveStates','getClassIdWithName','Scene_Skill_skillTypeWindowRect','isStateAddable','match','getStateData','normalColor','split','BattleHiddenSkillTypes','constructor','buff','addWindow','slipHp','resetFontSettings','onAddBuff','note','_stateRetainType','windowPadding','createSkillCostText','setPassiveStateSlipDamageJS','right','currentValueSkillsStatesCore','stateTurns','applyBuffTurnManipulationEffects','isMaxBuffAffected','checkShowHideSwitchNotetags','drawParamText','statusWindowRect','name','setupSkillsStatesCore'];const _0x13f9=function(_0x512f7b,_0x13c9a6){_0x512f7b=_0x512f7b-0x15e;let _0x666a3=_0x666a[_0x512f7b];return _0x666a3;};const _0xfbd732=_0x13f9;(function(_0x235bf6,_0x10af79){const _0x2ccf8b=_0x13f9;while(!![]){try{const _0x16bd2e=parseInt(_0x2ccf8b(0x348))*-parseInt(_0x2ccf8b(0x2b0))+-parseInt(_0x2ccf8b(0x29d))+-parseInt(_0x2ccf8b(0x3a5))+-parseInt(_0x2ccf8b(0x1a9))*parseInt(_0x2ccf8b(0x34d))+parseInt(_0x2ccf8b(0x203))+-parseInt(_0x2ccf8b(0x27c))*-parseInt(_0x2ccf8b(0x3a1))+-parseInt(_0x2ccf8b(0x1e8))*-parseInt(_0x2ccf8b(0x320));if(_0x16bd2e===_0x10af79)break;else _0x235bf6['push'](_0x235bf6['shift']());}catch(_0xf9f78b){_0x235bf6['push'](_0x235bf6['shift']());}}}(_0x666a,0xc6ec3));var label=_0xfbd732(0x377),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xfbd732(0x243)](function(_0x148198){const _0x54ef2a=_0xfbd732;return _0x148198[_0x54ef2a(0x2ee)]&&_0x148198[_0x54ef2a(0x2de)][_0x54ef2a(0x32e)]('['+label+']');})[0x0];VisuMZ[label][_0xfbd732(0x1ee)]=VisuMZ[label][_0xfbd732(0x1ee)]||{},VisuMZ[_0xfbd732(0x33c)]=function(_0x7747e8,_0x489187){const _0x1964de=_0xfbd732;for(const _0x5d7f28 in _0x489187){if(_0x5d7f28['match'](/(.*):(.*)/i)){const _0x215ad2=String(RegExp['$1']),_0x5214fc=String(RegExp['$2'])['toUpperCase']()[_0x1964de(0x25a)]();let _0xd125b5,_0xc2a8be,_0x2fca05;switch(_0x5214fc){case'NUM':_0xd125b5=_0x489187[_0x5d7f28]!==''?Number(_0x489187[_0x5d7f28]):0x0;break;case _0x1964de(0x33d):_0xc2a8be=_0x489187[_0x5d7f28]!==''?JSON[_0x1964de(0x263)](_0x489187[_0x5d7f28]):[],_0xd125b5=_0xc2a8be[_0x1964de(0x226)](_0x5430aa=>Number(_0x5430aa));break;case _0x1964de(0x2ec):_0xd125b5=_0x489187[_0x5d7f28]!==''?eval(_0x489187[_0x5d7f28]):null;break;case'ARRAYEVAL':_0xc2a8be=_0x489187[_0x5d7f28]!==''?JSON[_0x1964de(0x263)](_0x489187[_0x5d7f28]):[],_0xd125b5=_0xc2a8be[_0x1964de(0x226)](_0x560e4e=>eval(_0x560e4e));break;case _0x1964de(0x2ff):_0xd125b5=_0x489187[_0x5d7f28]!==''?JSON[_0x1964de(0x263)](_0x489187[_0x5d7f28]):'';break;case _0x1964de(0x330):_0xc2a8be=_0x489187[_0x5d7f28]!==''?JSON['parse'](_0x489187[_0x5d7f28]):[],_0xd125b5=_0xc2a8be[_0x1964de(0x226)](_0x1fba50=>JSON['parse'](_0x1fba50));break;case _0x1964de(0x23c):_0xd125b5=_0x489187[_0x5d7f28]!==''?new Function(JSON[_0x1964de(0x263)](_0x489187[_0x5d7f28])):new Function('return\x200');break;case _0x1964de(0x215):_0xc2a8be=_0x489187[_0x5d7f28]!==''?JSON[_0x1964de(0x263)](_0x489187[_0x5d7f28]):[],_0xd125b5=_0xc2a8be['map'](_0x1600e2=>new Function(JSON[_0x1964de(0x263)](_0x1600e2)));break;case _0x1964de(0x175):_0xd125b5=_0x489187[_0x5d7f28]!==''?String(_0x489187[_0x5d7f28]):'';break;case _0x1964de(0x394):_0xc2a8be=_0x489187[_0x5d7f28]!==''?JSON[_0x1964de(0x263)](_0x489187[_0x5d7f28]):[],_0xd125b5=_0xc2a8be['map'](_0xb172dd=>String(_0xb172dd));break;case _0x1964de(0x374):_0x2fca05=_0x489187[_0x5d7f28]!==''?JSON[_0x1964de(0x263)](_0x489187[_0x5d7f28]):{},_0x7747e8[_0x215ad2]={},VisuMZ['ConvertParams'](_0x7747e8[_0x215ad2],_0x2fca05);continue;case _0x1964de(0x2fd):_0xc2a8be=_0x489187[_0x5d7f28]!==''?JSON['parse'](_0x489187[_0x5d7f28]):[],_0xd125b5=_0xc2a8be['map'](_0x29845a=>VisuMZ[_0x1964de(0x33c)]({},JSON[_0x1964de(0x263)](_0x29845a)));break;default:continue;}_0x7747e8[_0x215ad2]=_0xd125b5;}}return _0x7747e8;},(_0x45aa22=>{const _0x46201e=_0xfbd732,_0x1432cd=_0x45aa22['name'];for(const _0x6165c4 of dependencies){if(!Imported[_0x6165c4]){alert(_0x46201e(0x16e)['format'](_0x1432cd,_0x6165c4)),SceneManager[_0x46201e(0x30f)]();break;}}const _0x5e67a2=_0x45aa22[_0x46201e(0x2de)];if(_0x5e67a2[_0x46201e(0x1c9)](/\[Version[ ](.*?)\]/i)){const _0x4e44e1=Number(RegExp['$1']);_0x4e44e1!==VisuMZ[label]['version']&&(alert(_0x46201e(0x1fa)[_0x46201e(0x336)](_0x1432cd,_0x4e44e1)),SceneManager[_0x46201e(0x30f)]());}if(_0x5e67a2['match'](/\[Tier[ ](\d+)\]/i)){const _0x369e64=Number(RegExp['$1']);_0x369e64<tier?(alert(_0x46201e(0x240)[_0x46201e(0x336)](_0x1432cd,_0x369e64,tier)),SceneManager[_0x46201e(0x30f)]()):tier=Math[_0x46201e(0x368)](_0x369e64,tier);}VisuMZ[_0x46201e(0x33c)](VisuMZ[label][_0x46201e(0x1ee)],_0x45aa22[_0x46201e(0x2fb)]);})(pluginData),VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1a1)]=Scene_Boot['prototype'][_0xfbd732(0x36d)],Scene_Boot[_0xfbd732(0x248)][_0xfbd732(0x36d)]=function(){const _0xc70fd6=_0xfbd732;VisuMZ[_0xc70fd6(0x377)][_0xc70fd6(0x1a1)][_0xc70fd6(0x188)](this),this[_0xc70fd6(0x39f)]();},Scene_Boot[_0xfbd732(0x248)][_0xfbd732(0x39f)]=function(){const _0x105abb=_0xfbd732;if(VisuMZ[_0x105abb(0x200)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x105abb(0x350)]();},Scene_Boot[_0xfbd732(0x248)]['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x16372f=_0xfbd732;for(const _0x2743b9 of $dataSkills){if(!_0x2743b9)continue;VisuMZ[_0x16372f(0x377)][_0x16372f(0x1a8)](_0x2743b9),VisuMZ[_0x16372f(0x377)][_0x16372f(0x207)](_0x2743b9);}},Scene_Boot[_0xfbd732(0x248)][_0xfbd732(0x350)]=function(){const _0x19878a=_0xfbd732;for(const _0x871593 of $dataStates){if(!_0x871593)continue;VisuMZ['SkillsStatesCore'][_0x19878a(0x2f4)](_0x871593),VisuMZ[_0x19878a(0x377)][_0x19878a(0x31b)](_0x871593),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS'](_0x871593),VisuMZ[_0x19878a(0x377)][_0x19878a(0x2f9)](_0x871593);}},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2f0)]=VisuMZ[_0xfbd732(0x2f0)],VisuMZ[_0xfbd732(0x2f0)]=function(_0x23ed8e){const _0x5e497e=_0xfbd732;VisuMZ[_0x5e497e(0x377)][_0x5e497e(0x2f0)][_0x5e497e(0x188)](this,_0x23ed8e),VisuMZ[_0x5e497e(0x377)][_0x5e497e(0x1a8)](_0x23ed8e),VisuMZ['SkillsStatesCore'][_0x5e497e(0x207)](_0x23ed8e);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1f3)]=VisuMZ[_0xfbd732(0x1f3)],VisuMZ[_0xfbd732(0x1f3)]=function(_0x3b43a1){const _0x42dfef=_0xfbd732;VisuMZ[_0x42dfef(0x377)][_0x42dfef(0x1f3)][_0x42dfef(0x188)](this,_0x3b43a1),VisuMZ[_0x42dfef(0x377)][_0x42dfef(0x2f4)](_0x3b43a1),VisuMZ[_0x42dfef(0x377)]['Parse_Notetags_State_PassiveJS'](_0x3b43a1),VisuMZ[_0x42dfef(0x377)]['Parse_Notetags_State_SlipEffectJS'](_0x3b43a1),VisuMZ[_0x42dfef(0x377)][_0x42dfef(0x2f9)](_0x3b43a1);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1a8)]=function(_0x14b4cd){const _0x15e067=_0xfbd732,_0x11b72e=_0x14b4cd[_0x15e067(0x1d4)];_0x11b72e['match'](/<MP COST:[ ](\d+)>/i)&&(_0x14b4cd[_0x15e067(0x179)]=Number(RegExp['$1'])),_0x11b72e[_0x15e067(0x1c9)](/<TP COST:[ ](\d+)>/i)&&(_0x14b4cd['tpCost']=Number(RegExp['$1']));},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x24b)]={},VisuMZ[_0xfbd732(0x377)]['skillVisibleJS']={},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x207)]=function(_0x20d518){const _0xab7c40=_0xfbd732,_0x5d5a92=_0x20d518[_0xab7c40(0x1d4)];if(_0x5d5a92[_0xab7c40(0x1c9)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0xeaf647=String(RegExp['$1']),_0x1bdbb3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0xab7c40(0x336)](_0xeaf647);VisuMZ['SkillsStatesCore'][_0xab7c40(0x24b)][_0x20d518['id']]=new Function(_0xab7c40(0x3a9),_0x1bdbb3);}if(_0x5d5a92['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x28b5a1=String(RegExp['$1']),_0x443d47=_0xab7c40(0x2c0)[_0xab7c40(0x336)](_0x28b5a1);VisuMZ[_0xab7c40(0x377)][_0xab7c40(0x2b7)][_0x20d518['id']]=new Function('skill',_0x443d47);}},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2f4)]=function(_0x2699b2){const _0x21f811=_0xfbd732;_0x2699b2[_0x21f811(0x1c0)]=[_0x21f811(0x1f7),_0x21f811(0x1f5)];const _0x2a932f=_0x2699b2[_0x21f811(0x1d4)],_0x28fceb=_0x2a932f[_0x21f811(0x1c9)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x28fceb)for(const _0x2a566e of _0x28fceb){_0x2a566e['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x681f5d=String(RegExp['$1'])[_0x21f811(0x390)]()['trim']()['split'](',');for(const _0x41d4ca of _0x681f5d){_0x2699b2[_0x21f811(0x1c0)][_0x21f811(0x196)](_0x41d4ca[_0x21f811(0x25a)]());}}if(_0x2a932f[_0x21f811(0x1c9)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0xe76703=RegExp['$1']['split'](/[\r\n]+/);for(const _0x61c096 of _0xe76703){_0x2699b2[_0x21f811(0x1c0)][_0x21f811(0x196)](_0x61c096[_0x21f811(0x390)]()[_0x21f811(0x25a)]());}}_0x2a932f['match'](/<POSITIVE STATE>/i)&&_0x2699b2[_0x21f811(0x1c0)][_0x21f811(0x196)](_0x21f811(0x165)),_0x2a932f[_0x21f811(0x1c9)](/<NEGATIVE STATE>/i)&&_0x2699b2[_0x21f811(0x1c0)][_0x21f811(0x196)](_0x21f811(0x1ed));},VisuMZ[_0xfbd732(0x377)]['statePassiveConditionJS']={},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x31b)]=function(_0x9ab7c){const _0x41944c=_0xfbd732,_0xba7073=_0x9ab7c['note'];if(_0xba7073[_0x41944c(0x1c9)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x4f9971=String(RegExp['$1']),_0x1d911c=_0x41944c(0x20e)[_0x41944c(0x336)](_0x4f9971);VisuMZ[_0x41944c(0x377)][_0x41944c(0x211)][_0x9ab7c['id']]=new Function(_0x41944c(0x186),_0x1d911c);}},VisuMZ['SkillsStatesCore']['stateHpSlipDamageJS']={},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x17b)]={},VisuMZ['SkillsStatesCore'][_0xfbd732(0x224)]={},VisuMZ['SkillsStatesCore'][_0xfbd732(0x366)]={},VisuMZ[_0xfbd732(0x377)]['stateTpSlipDamageJS']={},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x391)]={},VisuMZ['SkillsStatesCore'][_0xfbd732(0x1b7)]=function(_0x261638){const _0x151175=_0xfbd732,_0x28afc3=_0x261638[_0x151175(0x1d4)],_0x3c464f=_0x151175(0x205);if(_0x28afc3[_0x151175(0x1c9)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x3097ca=String(RegExp['$1']),_0x70db45=_0x3c464f[_0x151175(0x336)](_0x3097ca,_0x151175(0x2ed),-0x1,'slipHp');VisuMZ[_0x151175(0x377)][_0x151175(0x25e)][_0x261638['id']]=new Function(_0x151175(0x342),_0x70db45);}else{if(_0x28afc3[_0x151175(0x1c9)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x567985=String(RegExp['$1']),_0x509c24=_0x3c464f[_0x151175(0x336)](_0x567985,_0x151175(0x289),0x1,'slipHp');VisuMZ[_0x151175(0x377)][_0x151175(0x17b)][_0x261638['id']]=new Function(_0x151175(0x342),_0x509c24);}}if(_0x28afc3[_0x151175(0x1c9)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x45a3fb=String(RegExp['$1']),_0x553f78=_0x3c464f[_0x151175(0x336)](_0x45a3fb,_0x151175(0x2ed),-0x1,_0x151175(0x2da));VisuMZ['SkillsStatesCore'][_0x151175(0x224)][_0x261638['id']]=new Function('stateId',_0x553f78);}else{if(_0x28afc3[_0x151175(0x1c9)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x34ad30=String(RegExp['$1']),_0x3def77=_0x3c464f[_0x151175(0x336)](_0x34ad30,'heal',0x1,_0x151175(0x2da));VisuMZ[_0x151175(0x377)]['stateMpSlipHealJS'][_0x261638['id']]=new Function(_0x151175(0x342),_0x3def77);}}if(_0x28afc3[_0x151175(0x1c9)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x21c322=String(RegExp['$1']),_0x17d854=_0x3c464f['format'](_0x21c322,_0x151175(0x2ed),-0x1,_0x151175(0x1b5));VisuMZ[_0x151175(0x377)][_0x151175(0x193)][_0x261638['id']]=new Function(_0x151175(0x342),_0x17d854);}else{if(_0x28afc3[_0x151175(0x1c9)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x45c77d=String(RegExp['$1']),_0x31300a=_0x3c464f[_0x151175(0x336)](_0x45c77d,_0x151175(0x289),0x1,'slipTp');VisuMZ['SkillsStatesCore'][_0x151175(0x391)][_0x261638['id']]=new Function(_0x151175(0x342),_0x31300a);}}},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2ea)]={},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x32a)]={},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x222)]={},VisuMZ['SkillsStatesCore'][_0xfbd732(0x2f9)]=function(_0x523bcf){const _0x390a86=_0xfbd732,_0x4f8020=_0x523bcf[_0x390a86(0x1d4)],_0x3b7ad2='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x4f8020[_0x390a86(0x1c9)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x5da17c=String(RegExp['$1']),_0x1861e3=_0x3b7ad2[_0x390a86(0x336)](_0x5da17c);VisuMZ[_0x390a86(0x377)][_0x390a86(0x2ea)][_0x523bcf['id']]=new Function(_0x390a86(0x342),_0x1861e3);}if(_0x4f8020[_0x390a86(0x1c9)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x2ffc57=String(RegExp['$1']),_0x3d3d66=_0x3b7ad2[_0x390a86(0x336)](_0x2ffc57);VisuMZ[_0x390a86(0x377)][_0x390a86(0x32a)][_0x523bcf['id']]=new Function(_0x390a86(0x342),_0x3d3d66);}if(_0x4f8020[_0x390a86(0x1c9)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x3692dd=String(RegExp['$1']),_0x54aabf=_0x3b7ad2['format'](_0x3692dd);VisuMZ[_0x390a86(0x377)][_0x390a86(0x222)][_0x523bcf['id']]=new Function(_0x390a86(0x342),_0x54aabf);}},DataManager[_0xfbd732(0x1c6)]=function(_0x471c90){const _0x2c05c6=_0xfbd732;_0x471c90=_0x471c90[_0x2c05c6(0x390)]()['trim'](),this[_0x2c05c6(0x232)]=this['_classIDs']||{};if(this[_0x2c05c6(0x232)][_0x471c90])return this['_classIDs'][_0x471c90];for(const _0x466e0f of $dataClasses){if(!_0x466e0f)continue;let _0x3787c6=_0x466e0f[_0x2c05c6(0x1e1)];_0x3787c6=_0x3787c6[_0x2c05c6(0x2d0)](/\x1I\[(\d+)\]/gi,''),_0x3787c6=_0x3787c6['replace'](/\\I\[(\d+)\]/gi,''),this[_0x2c05c6(0x232)][_0x3787c6['toUpperCase']()[_0x2c05c6(0x25a)]()]=_0x466e0f['id'];}return this[_0x2c05c6(0x232)][_0x471c90]||0x0;},DataManager[_0xfbd732(0x2f8)]=function(_0x5190a8){const _0x4cf588=_0xfbd732;this[_0x4cf588(0x31a)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x5190a8['id']])return this[_0x4cf588(0x31a)][_0x5190a8['id']];this[_0x4cf588(0x31a)][_0x5190a8['id']]=[_0x5190a8[_0x4cf588(0x282)]];if(_0x5190a8['note'][_0x4cf588(0x1c9)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1fe185=JSON[_0x4cf588(0x263)]('['+RegExp['$1'][_0x4cf588(0x1c9)](/\d+/g)+']');this[_0x4cf588(0x31a)][_0x5190a8['id']]=this[_0x4cf588(0x31a)][_0x5190a8['id']]['concat'](_0x1fe185);}else{if(_0x5190a8['note'][_0x4cf588(0x1c9)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x4d83b4=RegExp['$1'][_0x4cf588(0x1cc)](',');for(const _0x28469f of _0x4d83b4){const _0x12f66d=DataManager[_0x4cf588(0x333)](_0x28469f);if(_0x12f66d)this[_0x4cf588(0x31a)][_0x5190a8['id']]['push'](_0x12f66d);}}}return this['_stypeIDs'][_0x5190a8['id']];},DataManager[_0xfbd732(0x333)]=function(_0x5f4e27){const _0x105c57=_0xfbd732;_0x5f4e27=_0x5f4e27['toUpperCase']()[_0x105c57(0x25a)](),this[_0x105c57(0x31a)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x5f4e27])return this[_0x105c57(0x31a)][_0x5f4e27];for(let _0x40a5f=0x1;_0x40a5f<0x64;_0x40a5f++){if(!$dataSystem[_0x105c57(0x3aa)][_0x40a5f])continue;let _0x2e26b0=$dataSystem[_0x105c57(0x3aa)][_0x40a5f][_0x105c57(0x390)]()['trim']();_0x2e26b0=_0x2e26b0[_0x105c57(0x2d0)](/\x1I\[(\d+)\]/gi,''),_0x2e26b0=_0x2e26b0[_0x105c57(0x2d0)](/\\I\[(\d+)\]/gi,''),this[_0x105c57(0x31a)][_0x2e26b0]=_0x40a5f;}return this[_0x105c57(0x31a)][_0x5f4e27]||0x0;},DataManager[_0xfbd732(0x194)]=function(_0x325b80){const _0xb06564=_0xfbd732;_0x325b80=_0x325b80[_0xb06564(0x390)]()[_0xb06564(0x25a)](),this['_skillIDs']=this[_0xb06564(0x2ab)]||{};if(this[_0xb06564(0x2ab)][_0x325b80])return this[_0xb06564(0x2ab)][_0x325b80];for(const _0x4fe286 of $dataSkills){if(!_0x4fe286)continue;this[_0xb06564(0x2ab)][_0x4fe286['name'][_0xb06564(0x390)]()[_0xb06564(0x25a)]()]=_0x4fe286['id'];}return this[_0xb06564(0x2ab)][_0x325b80]||0x0;},DataManager[_0xfbd732(0x213)]=function(_0x5d5aef){const _0x31d0d8=_0xfbd732;_0x5d5aef=_0x5d5aef[_0x31d0d8(0x390)]()[_0x31d0d8(0x25a)](),this[_0x31d0d8(0x250)]=this[_0x31d0d8(0x250)]||{};if(this['_stateIDs'][_0x5d5aef])return this[_0x31d0d8(0x250)][_0x5d5aef];for(const _0x48e8c4 of $dataStates){if(!_0x48e8c4)continue;this[_0x31d0d8(0x250)][_0x48e8c4[_0x31d0d8(0x1e1)][_0x31d0d8(0x390)]()[_0x31d0d8(0x25a)]()]=_0x48e8c4['id'];}return this[_0x31d0d8(0x250)][_0x5d5aef]||0x0;},DataManager[_0xfbd732(0x317)]=function(_0x3fa87d){const _0x2ff3cc=_0xfbd732;this[_0x2ff3cc(0x280)]=this[_0x2ff3cc(0x280)]||{};if(this[_0x2ff3cc(0x280)][_0x3fa87d])return this[_0x2ff3cc(0x280)][_0x3fa87d];return $dataStates[_0x3fa87d][_0x2ff3cc(0x1d4)][_0x2ff3cc(0x1c9)](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0x3fa87d]=Number(RegExp['$1']):this[_0x2ff3cc(0x280)][_0x3fa87d]=VisuMZ[_0x2ff3cc(0x377)][_0x2ff3cc(0x1ee)]['States'][_0x2ff3cc(0x1ea)],this[_0x2ff3cc(0x280)][_0x3fa87d];},ColorManager[_0xfbd732(0x1a3)]=function(_0x4771a8,_0x3d72c8){const _0x5ab966=_0xfbd732;return _0x3d72c8=String(_0x3d72c8),this['_colorCache']=this[_0x5ab966(0x2e7)]||{},_0x3d72c8[_0x5ab966(0x1c9)](/#(.*)/i)?this[_0x5ab966(0x2e7)][_0x4771a8]='#%1'['format'](String(RegExp['$1'])):this['_colorCache'][_0x4771a8]=this[_0x5ab966(0x371)](Number(_0x3d72c8)),this[_0x5ab966(0x2e7)][_0x4771a8];},ColorManager[_0xfbd732(0x322)]=function(_0x3cdfca){const _0x8a2247=_0xfbd732;return _0x3cdfca=String(_0x3cdfca),_0x3cdfca[_0x8a2247(0x1c9)](/#(.*)/i)?_0x8a2247(0x197)[_0x8a2247(0x336)](String(RegExp['$1'])):this[_0x8a2247(0x371)](Number(_0x3cdfca));},ColorManager[_0xfbd732(0x28d)]=function(_0x2fd845){const _0x52843a=_0xfbd732;if(typeof _0x2fd845===_0x52843a(0x2dc))_0x2fd845=$dataStates[_0x2fd845];const _0x261ab2=_0x52843a(0x397)[_0x52843a(0x336)](_0x2fd845['id']);this['_colorCache']=this[_0x52843a(0x2e7)]||{};if(this[_0x52843a(0x2e7)][_0x261ab2])return this[_0x52843a(0x2e7)][_0x261ab2];const _0x274643=this[_0x52843a(0x312)](_0x2fd845);return this[_0x52843a(0x1a3)](_0x261ab2,_0x274643);},ColorManager[_0xfbd732(0x312)]=function(_0x2b1ae0){const _0x4affa8=_0xfbd732,_0x217503=_0x2b1ae0['note'];if(_0x217503[_0x4affa8(0x1c9)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x217503[_0x4affa8(0x1c9)](/<POSITIVE STATE>/i))return VisuMZ[_0x4affa8(0x377)]['Settings'][_0x4affa8(0x264)]['ColorPositive'];else return _0x217503[_0x4affa8(0x1c9)](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore']['Settings']['States'][_0x4affa8(0x20b)]:VisuMZ[_0x4affa8(0x377)][_0x4affa8(0x1ee)][_0x4affa8(0x264)][_0x4affa8(0x1fb)];}},ColorManager['buffColor']=function(){const _0x33b6e6=_0xfbd732,_0x1a369e='_stored_buffColor';this[_0x33b6e6(0x2e7)]=this[_0x33b6e6(0x2e7)]||{};if(this[_0x33b6e6(0x2e7)][_0x1a369e])return this[_0x33b6e6(0x2e7)][_0x1a369e];const _0x197ccc=VisuMZ['SkillsStatesCore'][_0x33b6e6(0x1ee)][_0x33b6e6(0x189)][_0x33b6e6(0x202)];return this[_0x33b6e6(0x1a3)](_0x1a369e,_0x197ccc);},ColorManager['debuffColor']=function(){const _0x1bf5f2=_0xfbd732,_0x3bb8fc=_0x1bf5f2(0x305);this['_colorCache']=this[_0x1bf5f2(0x2e7)]||{};if(this[_0x1bf5f2(0x2e7)][_0x3bb8fc])return this[_0x1bf5f2(0x2e7)][_0x3bb8fc];const _0xd79741=VisuMZ[_0x1bf5f2(0x377)][_0x1bf5f2(0x1ee)][_0x1bf5f2(0x189)][_0x1bf5f2(0x2aa)];return this[_0x1bf5f2(0x1a3)](_0x3bb8fc,_0xd79741);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2e1)]=BattleManager[_0xfbd732(0x1fd)],BattleManager[_0xfbd732(0x1fd)]=function(){const _0x3a07dc=_0xfbd732;this[_0x3a07dc(0x261)](),VisuMZ['SkillsStatesCore'][_0x3a07dc(0x2e1)][_0x3a07dc(0x188)](this);},BattleManager[_0xfbd732(0x261)]=function(){const _0x11f6a3=_0xfbd732,_0xe1c209=VisuMZ['SkillsStatesCore']['Settings'][_0x11f6a3(0x264)];if(!_0xe1c209)return;if(_0xe1c209['ActionEndUpdate']===![])return;if(!this['_subject'])return;this[_0x11f6a3(0x277)][_0x11f6a3(0x261)]();},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x261)]=function(){const _0x3524d8=_0xfbd732;for(const _0x14a7b0 of this[_0x3524d8(0x1b2)]){const _0x10e871=$dataStates[_0x14a7b0];if(!_0x10e871)continue;if(_0x10e871[_0x3524d8(0x2b6)]!==0x1)continue;this['_stateTurns'][_0x14a7b0]>0x0&&this[_0x3524d8(0x2d4)][_0x14a7b0]--;}this[_0x3524d8(0x379)](0x1);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x253)]=function(){const _0x26ee97=_0xfbd732,_0x2c2f30=VisuMZ[_0x26ee97(0x377)][_0x26ee97(0x1ee)][_0x26ee97(0x264)];for(const _0x3b2cd8 of this[_0x26ee97(0x1b2)]){const _0x17552a=$dataStates[_0x3b2cd8];if(_0x2c2f30&&_0x2c2f30[_0x26ee97(0x169)]!==![]){if(_0x17552a&&_0x17552a[_0x26ee97(0x2b6)]===0x1)continue;}this['_stateTurns'][_0x3b2cd8]>0x0&&this[_0x26ee97(0x2d4)][_0x3b2cd8]--;}},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x307)]=Game_Action[_0xfbd732(0x248)]['applyItemUserEffect'],Game_Action[_0xfbd732(0x248)]['applyItemUserEffect']=function(_0x276bf3){const _0x3e93c0=_0xfbd732;VisuMZ[_0x3e93c0(0x377)][_0x3e93c0(0x307)][_0x3e93c0(0x188)](this,_0x276bf3),this[_0x3e93c0(0x1ab)](_0x276bf3);},Game_Action[_0xfbd732(0x248)][_0xfbd732(0x1ab)]=function(_0x1282fa){const _0xdfb58d=_0xfbd732;this['applyStateCategoryRemovalEffects'](_0x1282fa),this[_0xdfb58d(0x363)](_0x1282fa),this[_0xdfb58d(0x1dc)](_0x1282fa),this['applyDebuffTurnManipulationEffects'](_0x1282fa);},Game_Action[_0xfbd732(0x248)][_0xfbd732(0x185)]=function(_0x345e19){const _0x3715cf=_0xfbd732;if(_0x345e19[_0x3715cf(0x2a7)]()[_0x3715cf(0x241)]<=0x0)return;const _0x3fe9c8=this[_0x3715cf(0x392)]()[_0x3715cf(0x1d4)];if(_0x3fe9c8[_0x3715cf(0x1c9)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0xe738a6=String(RegExp['$1']);_0x345e19['removeStatesByCategoryAll'](_0xe738a6);}const _0x56f4cf=_0x3fe9c8['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x56f4cf)for(const _0x3ced6b of _0x56f4cf){_0x3ced6b[_0x3715cf(0x1c9)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x2128be=String(RegExp['$1']),_0x1095d9=Number(RegExp['$2']);_0x345e19['removeStatesByCategory'](_0x2128be,_0x1095d9);}},Game_Action['prototype'][_0xfbd732(0x363)]=function(_0x3e3392){const _0xa1e98c=_0xfbd732,_0x4af2be=this['item']()[_0xa1e98c(0x1d4)],_0x550b0d=_0x4af2be[_0xa1e98c(0x1c9)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x550b0d)for(const _0xd9fdea of _0x550b0d){let _0x3677dd=0x0,_0x52f7fb=0x0;if(_0xd9fdea[_0xa1e98c(0x1c9)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x3677dd=Number(RegExp['$1']),_0x52f7fb=Number(RegExp['$2']);else _0xd9fdea['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x3677dd=DataManager[_0xa1e98c(0x213)](RegExp['$1']),_0x52f7fb=Number(RegExp['$2']));_0x3e3392['setStateTurns'](_0x3677dd,_0x52f7fb),this[_0xa1e98c(0x266)](_0x3e3392);}const _0x369791=_0x4af2be[_0xa1e98c(0x1c9)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x369791)for(const _0x28faba of _0x369791){let _0x2f37e3=0x0,_0x33d894=0x0;if(_0x28faba[_0xa1e98c(0x1c9)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x2f37e3=Number(RegExp['$1']),_0x33d894=Number(RegExp['$2']);else _0x28faba[_0xa1e98c(0x1c9)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x2f37e3=DataManager[_0xa1e98c(0x213)](RegExp['$1']),_0x33d894=Number(RegExp['$2']));_0x3e3392[_0xa1e98c(0x2b5)](_0x2f37e3,_0x33d894),this[_0xa1e98c(0x266)](_0x3e3392);}},Game_Action['prototype'][_0xfbd732(0x1dc)]=function(_0x22989c){const _0x46c7ff=_0xfbd732,_0x49a0ca=[_0x46c7ff(0x37b),_0x46c7ff(0x1e9),'ATK',_0x46c7ff(0x27b),'MAT','MDF',_0x46c7ff(0x2d8),'LUK'],_0xcb895b=this[_0x46c7ff(0x392)]()['note'],_0x1874e9=_0xcb895b[_0x46c7ff(0x1c9)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x1874e9)for(const _0x3a2028 of _0x1874e9){_0x3a2028[_0x46c7ff(0x1c9)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x59a805=_0x49a0ca[_0x46c7ff(0x2ad)](String(RegExp['$1'])[_0x46c7ff(0x390)]()),_0x229a6a=Number(RegExp['$2']);_0x59a805>=0x0&&(_0x22989c[_0x46c7ff(0x1c4)](_0x59a805,_0x229a6a),this[_0x46c7ff(0x266)](_0x22989c));}const _0x3d4730=_0xcb895b[_0x46c7ff(0x1c9)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3d4730)for(const _0x276178 of _0x1874e9){_0x276178[_0x46c7ff(0x1c9)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x9fa2e1=_0x49a0ca[_0x46c7ff(0x2ad)](String(RegExp['$1'])[_0x46c7ff(0x390)]()),_0x2ecb89=Number(RegExp['$2']);_0x9fa2e1>=0x0&&(_0x22989c[_0x46c7ff(0x2cf)](_0x9fa2e1,_0x2ecb89),this[_0x46c7ff(0x266)](_0x22989c));}},Game_Action['prototype'][_0xfbd732(0x365)]=function(_0x30c68c){const _0xd24202=_0xfbd732,_0x1e4250=[_0xd24202(0x37b),'MAXMP','ATK','DEF',_0xd24202(0x204),_0xd24202(0x2e9),_0xd24202(0x2d8),_0xd24202(0x236)],_0x32a425=this['item']()[_0xd24202(0x1d4)],_0x334494=_0x32a425['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x334494)for(const _0x586314 of _0x334494){_0x586314[_0xd24202(0x1c9)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x12d3fc=_0x1e4250[_0xd24202(0x2ad)](String(RegExp['$1'])[_0xd24202(0x390)]()),_0x3aaf18=Number(RegExp['$2']);_0x12d3fc>=0x0&&(_0x30c68c['setDebuffTurns'](_0x12d3fc,_0x3aaf18),this[_0xd24202(0x266)](_0x30c68c));}const _0x486442=_0x32a425[_0xd24202(0x1c9)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x486442)for(const _0x46b445 of _0x334494){_0x46b445[_0xd24202(0x1c9)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3b5569=_0x1e4250[_0xd24202(0x2ad)](String(RegExp['$1'])[_0xd24202(0x390)]()),_0x3230d1=Number(RegExp['$2']);_0x3b5569>=0x0&&(_0x30c68c[_0xd24202(0x182)](_0x3b5569,_0x3230d1),this['makeSuccess'](_0x30c68c));}},VisuMZ['SkillsStatesCore'][_0xfbd732(0x29e)]=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x2e8)],Game_BattlerBase[_0xfbd732(0x248)]['initMembers']=function(){const _0x1c25ac=_0xfbd732;this[_0x1c25ac(0x27d)]={},this['initMembersSkillsStatesCore'](),VisuMZ[_0x1c25ac(0x377)][_0x1c25ac(0x29e)][_0x1c25ac(0x188)](this);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x15e)]=function(){const _0x438e42=_0xfbd732;this[_0x438e42(0x1d5)]='',this['_stateData']={},this[_0x438e42(0x225)]={},this[_0x438e42(0x279)]={};},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x278)]=function(_0xaa8aeb){const _0x517d3c=_0xfbd732;return this['_cache']=this['_cache']||{},this[_0x517d3c(0x27d)][_0xaa8aeb]!==undefined;},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2b1)]=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x380)],Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x380)]=function(){const _0x1b4845=_0xfbd732;this[_0x1b4845(0x27d)]={},VisuMZ[_0x1b4845(0x377)][_0x1b4845(0x2b1)][_0x1b4845(0x188)](this);},VisuMZ['SkillsStatesCore'][_0xfbd732(0x308)]=Game_BattlerBase[_0xfbd732(0x248)]['eraseState'],Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x2bf)]=function(_0x212c98){const _0x4b82bb=_0xfbd732;let _0x482e05=this[_0x4b82bb(0x327)](_0x212c98);VisuMZ[_0x4b82bb(0x377)][_0x4b82bb(0x308)][_0x4b82bb(0x188)](this,_0x212c98);if(_0x482e05&&!this[_0x4b82bb(0x327)](_0x212c98))this[_0x4b82bb(0x321)](_0x212c98);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x321)]=function(_0x4f9f8d){const _0x386b28=_0xfbd732;this[_0x386b28(0x2ca)](_0x4f9f8d),this[_0x386b28(0x22d)](_0x4f9f8d),this['clearStateOrigin'](_0x4f9f8d);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x181)]=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x1e7)],Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x1e7)]=function(_0x152d2d){const _0x415d32=_0xfbd732,_0x4914dd=$dataStates[_0x152d2d],_0xe7b00a=this[_0x415d32(0x1db)](_0x152d2d),_0x5d2fc1=this['getStateReapplyRulings'](_0x4914dd)['toLowerCase']()[_0x415d32(0x25a)]();switch(_0x5d2fc1){case'ignore':if(_0xe7b00a<=0x0)VisuMZ[_0x415d32(0x377)]['Game_BattlerBase_resetStateCounts'][_0x415d32(0x188)](this,_0x152d2d);break;case _0x415d32(0x273):VisuMZ[_0x415d32(0x377)][_0x415d32(0x181)]['call'](this,_0x152d2d);break;case _0x415d32(0x389):VisuMZ[_0x415d32(0x377)][_0x415d32(0x181)][_0x415d32(0x188)](this,_0x152d2d),this['_stateTurns'][_0x152d2d]=Math[_0x415d32(0x368)](this['_stateTurns'][_0x152d2d],_0xe7b00a);break;case _0x415d32(0x337):VisuMZ['SkillsStatesCore'][_0x415d32(0x181)][_0x415d32(0x188)](this,_0x152d2d),this[_0x415d32(0x2d4)][_0x152d2d]+=_0xe7b00a;break;default:VisuMZ[_0x415d32(0x377)][_0x415d32(0x181)][_0x415d32(0x188)](this,_0x152d2d);break;}},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x2bb)]=function(_0x9f58b0){const _0x5aa775=_0xfbd732,_0x32816b=_0x9f58b0[_0x5aa775(0x1d4)];return _0x32816b['match'](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x5aa775(0x377)][_0x5aa775(0x1ee)]['States'][_0x5aa775(0x339)];},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x325)]=Game_BattlerBase['prototype'][_0xfbd732(0x3ac)],Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x3ac)]=function(_0x1a374d,_0x216d0e){const _0x35c8a5=_0xfbd732,_0x250608=VisuMZ[_0x35c8a5(0x377)]['Settings'][_0x35c8a5(0x189)][_0x35c8a5(0x339)],_0x276faf=this[_0x35c8a5(0x270)](_0x1a374d);switch(_0x250608){case _0x35c8a5(0x22f):if(_0x276faf<=0x0)this[_0x35c8a5(0x2b3)][_0x1a374d]=_0x216d0e;break;case'reset':this['_buffTurns'][_0x1a374d]=_0x216d0e;break;case'greater':this['_buffTurns'][_0x1a374d]=Math[_0x35c8a5(0x368)](_0x276faf,_0x216d0e);break;case _0x35c8a5(0x337):this['_buffTurns'][_0x1a374d]+=_0x216d0e;break;default:VisuMZ['SkillsStatesCore'][_0x35c8a5(0x325)][_0x35c8a5(0x188)](this,_0x1a374d,_0x216d0e);break;}const _0x5d24fb=VisuMZ[_0x35c8a5(0x377)]['Settings'][_0x35c8a5(0x189)][_0x35c8a5(0x1ea)];this[_0x35c8a5(0x2b3)][_0x1a374d]=this[_0x35c8a5(0x2b3)][_0x1a374d][_0x35c8a5(0x283)](0x0,_0x5d24fb);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x343)]=function(){const _0x39cc8c=_0xfbd732;if(this[_0x39cc8c(0x27d)][_0x39cc8c(0x252)]!==undefined)return this['_cache'][_0x39cc8c(0x252)];this['_cache'][_0x39cc8c(0x252)]=![];const _0xfdfc3c=this[_0x39cc8c(0x2a7)]();for(const _0x4b8345 of _0xfdfc3c){if(!_0x4b8345)continue;if(_0x4b8345[_0x39cc8c(0x1d4)][_0x39cc8c(0x1c9)](/<GROUP DEFEAT>/i)){this[_0x39cc8c(0x27d)][_0x39cc8c(0x252)]=!![];break;}}return this[_0x39cc8c(0x27d)][_0x39cc8c(0x252)];},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x168)]=Game_BattlerBase['prototype'][_0xfbd732(0x328)],Game_BattlerBase['prototype'][_0xfbd732(0x328)]=function(){const _0x246396=_0xfbd732;this[_0x246396(0x214)]()!==''?this['clearStatesWithStateRetain']():(VisuMZ[_0x246396(0x377)][_0x246396(0x168)][_0x246396(0x188)](this),this['initMembersSkillsStatesCore']());},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x246)]=function(){const _0x59bdd3=_0xfbd732,_0x46e9a8=this[_0x59bdd3(0x2a7)]();for(const _0x50ee4a of _0x46e9a8){if(_0x50ee4a&&this[_0x59bdd3(0x18c)](_0x50ee4a))this[_0x59bdd3(0x2bf)](_0x50ee4a['id']);}this[_0x59bdd3(0x27d)]={};},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x18c)]=function(_0x244da4){const _0x36616f=_0xfbd732,_0xc29032=this[_0x36616f(0x214)]();if(_0xc29032!==''){const _0xf5c928=_0x244da4['note'];if(_0xc29032===_0x36616f(0x1a0)&&_0xf5c928['match'](/<NO DEATH CLEAR>/i))return![];if(_0xc29032==='recover\x20all'&&_0xf5c928['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x36616f(0x327)](_0x244da4['id']);},Game_BattlerBase['prototype'][_0xfbd732(0x214)]=function(){const _0x1d8bbb=_0xfbd732;return this[_0x1d8bbb(0x1d5)];},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x297)]=function(_0x5e5cb3){const _0x9fe41d=_0xfbd732;this[_0x9fe41d(0x1d5)]=_0x5e5cb3;},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x324)]=function(){const _0x560659=_0xfbd732;this[_0x560659(0x1d5)]='';},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x341)]=Game_BattlerBase['prototype'][_0xfbd732(0x16f)],Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x16f)]=function(){const _0xf69782=_0xfbd732;this['setStateRetainType'](_0xf69782(0x1a0)),VisuMZ[_0xf69782(0x377)]['Game_BattlerBase_die'][_0xf69782(0x188)](this),this[_0xf69782(0x324)]();},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2f5)]=Game_BattlerBase['prototype'][_0xfbd732(0x1b1)],Game_BattlerBase[_0xfbd732(0x248)]['recoverAll']=function(){const _0x18b16d=_0xfbd732;this['setStateRetainType'](_0x18b16d(0x2df)),VisuMZ[_0x18b16d(0x377)]['Game_BattlerBase_recoverAll']['call'](this),this[_0x18b16d(0x324)]();},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x35a)]=function(_0x136747){const _0x3e83a5=_0xfbd732;for(settings of VisuMZ['SkillsStatesCore'][_0x3e83a5(0x1ee)][_0x3e83a5(0x2ac)]){const _0x339f77=settings['CalcJS']['call'](this,_0x136747);if(!settings[_0x3e83a5(0x295)][_0x3e83a5(0x188)](this,_0x136747,_0x339f77))return![];}return!![];},Game_BattlerBase[_0xfbd732(0x248)]['paySkillCost']=function(_0x2d7795){const _0x566d88=_0xfbd732;for(settings of VisuMZ[_0x566d88(0x377)][_0x566d88(0x1ee)][_0x566d88(0x2ac)]){const _0x24bb7a=settings[_0x566d88(0x362)][_0x566d88(0x188)](this,_0x2d7795);settings[_0x566d88(0x192)][_0x566d88(0x188)](this,_0x2d7795,_0x24bb7a);}},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1a4)]=Game_BattlerBase['prototype'][_0xfbd732(0x302)],Game_BattlerBase['prototype'][_0xfbd732(0x302)]=function(_0x555b5d){const _0x17fb1d=_0xfbd732;if(!_0x555b5d)return![];if(!VisuMZ[_0x17fb1d(0x377)][_0x17fb1d(0x1a4)][_0x17fb1d(0x188)](this,_0x555b5d))return![];if(!this[_0x17fb1d(0x27f)](_0x555b5d))return![];if(!this[_0x17fb1d(0x24e)](_0x555b5d))return![];if(!this[_0x17fb1d(0x30d)](_0x555b5d))return![];return!![];},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x27f)]=function(_0x5b0369){const _0x3f0595=_0xfbd732;if(!this[_0x3f0595(0x267)](_0x5b0369))return![];return!![];},Game_BattlerBase['prototype'][_0xfbd732(0x267)]=function(_0x46eeb1){const _0x1cc0a5=_0xfbd732,_0x4c5efb=_0x46eeb1[_0x1cc0a5(0x1d4)];if(_0x4c5efb[_0x1cc0a5(0x1c9)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58f14b=JSON[_0x1cc0a5(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x29371b of _0x58f14b){if(!$gameSwitches[_0x1cc0a5(0x160)](_0x29371b))return![];}return!![];}if(_0x4c5efb[_0x1cc0a5(0x1c9)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b60d1=JSON[_0x1cc0a5(0x263)]('['+RegExp['$1'][_0x1cc0a5(0x1c9)](/\d+/g)+']');for(const _0x32ff57 of _0x4b60d1){if(!$gameSwitches[_0x1cc0a5(0x160)](_0x32ff57))return![];}return!![];}if(_0x4c5efb[_0x1cc0a5(0x1c9)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x196761=JSON[_0x1cc0a5(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x103f71 of _0x196761){if($gameSwitches[_0x1cc0a5(0x160)](_0x103f71))return!![];}return![];}if(_0x4c5efb[_0x1cc0a5(0x1c9)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32f00e=JSON[_0x1cc0a5(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x372996 of _0x32f00e){if(!$gameSwitches[_0x1cc0a5(0x160)](_0x372996))return!![];}return![];}if(_0x4c5efb[_0x1cc0a5(0x1c9)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a966a=JSON[_0x1cc0a5(0x263)]('['+RegExp['$1'][_0x1cc0a5(0x1c9)](/\d+/g)+']');for(const _0x14c898 of _0x5a966a){if(!$gameSwitches[_0x1cc0a5(0x160)](_0x14c898))return!![];}return![];}if(_0x4c5efb[_0x1cc0a5(0x1c9)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x546788=JSON[_0x1cc0a5(0x263)]('['+RegExp['$1'][_0x1cc0a5(0x1c9)](/\d+/g)+']');for(const _0x57b1fa of _0x546788){if($gameSwitches[_0x1cc0a5(0x160)](_0x57b1fa))return![];}return!![];}return!![];},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x24e)]=function(_0x56c846){const _0x1f69b3=_0xfbd732,_0x364cb9=_0x56c846[_0x1f69b3(0x1d4)],_0x3bec51=VisuMZ[_0x1f69b3(0x377)][_0x1f69b3(0x24b)];return _0x3bec51[_0x56c846['id']]?_0x3bec51[_0x56c846['id']][_0x1f69b3(0x188)](this,_0x56c846):!![];},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x30d)]=function(_0x45d877){const _0x516d52=_0xfbd732;return VisuMZ[_0x516d52(0x377)][_0x516d52(0x1ee)][_0x516d52(0x234)][_0x516d52(0x223)]['call'](this,_0x45d877);},VisuMZ[_0xfbd732(0x377)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x2a3)],Game_BattlerBase['prototype']['skillMpCost']=function(_0x1595c4){const _0x1a0858=_0xfbd732;for(settings of VisuMZ[_0x1a0858(0x377)][_0x1a0858(0x1ee)][_0x1a0858(0x2ac)]){if(settings[_0x1a0858(0x395)][_0x1a0858(0x390)]()==='MP')return settings[_0x1a0858(0x362)][_0x1a0858(0x188)](this,_0x1595c4);}return VisuMZ[_0x1a0858(0x377)][_0x1a0858(0x245)][_0x1a0858(0x188)](this,_0x1595c4);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1ba)]=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x1fe)],Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x1fe)]=function(_0x145a29){const _0x18b204=_0xfbd732;for(settings of VisuMZ[_0x18b204(0x377)][_0x18b204(0x1ee)][_0x18b204(0x2ac)]){if(settings[_0x18b204(0x395)][_0x18b204(0x390)]()==='TP')return settings[_0x18b204(0x362)][_0x18b204(0x188)](this,_0x145a29);}return VisuMZ[_0x18b204(0x377)][_0x18b204(0x1ba)]['call'](this,_0x145a29);},Game_BattlerBase['prototype'][_0xfbd732(0x17a)]=function(_0x4dcd30){const _0x5d79d2=_0xfbd732;if(typeof _0x4dcd30===_0x5d79d2(0x2dc))_0x4dcd30=$dataStates[_0x4dcd30];return this[_0x5d79d2(0x2a7)]()[_0x5d79d2(0x32e)](_0x4dcd30);},VisuMZ['SkillsStatesCore'][_0xfbd732(0x39e)]=Game_BattlerBase['prototype'][_0xfbd732(0x2a7)],Game_BattlerBase['prototype'][_0xfbd732(0x2a7)]=function(){const _0x1a7759=_0xfbd732;let _0x4f3601=VisuMZ[_0x1a7759(0x377)][_0x1a7759(0x39e)][_0x1a7759(0x188)](this);if(this['_checkingPassiveStates'])return _0x4f3601;return this[_0x1a7759(0x1f4)]=!![],this[_0x1a7759(0x1c5)](_0x4f3601),this[_0x1a7759(0x1f4)]=undefined,_0x4f3601;},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x1c5)]=function(_0x5eeadf){const _0x4402eb=_0xfbd732,_0x401bc7=this[_0x4402eb(0x2c1)]();for(state of _0x401bc7){if(!state)continue;if(!this[_0x4402eb(0x370)](state)&&_0x5eeadf[_0x4402eb(0x32e)](state))continue;_0x5eeadf[_0x4402eb(0x196)](state);}_0x401bc7[_0x4402eb(0x241)]>0x0&&_0x5eeadf[_0x4402eb(0x272)]((_0x104c4d,_0x2811d5)=>{const _0x59cf01=_0x4402eb,_0x5a26a0=_0x104c4d[_0x59cf01(0x171)],_0x53509d=_0x2811d5[_0x59cf01(0x171)];if(_0x5a26a0!==_0x53509d)return _0x53509d-_0x5a26a0;return _0x104c4d-_0x2811d5;});},Game_BattlerBase[_0xfbd732(0x248)]['isPassiveStateStackable']=function(_0x4ec05d){const _0x52c404=_0xfbd732;return _0x4ec05d['note'][_0x52c404(0x1c9)](/<PASSIVE STACKABLE>/i);},Game_BattlerBase['prototype']['convertPassiveStates']=function(){const _0x1d9cb0=_0xfbd732,_0x267834=[];for(const _0x1ae698 of this[_0x1d9cb0(0x27d)][_0x1d9cb0(0x2c1)]){const _0x1ef867=$dataStates[_0x1ae698];if(!_0x1ef867)continue;if(!this[_0x1d9cb0(0x28e)](_0x1ef867))continue;_0x267834[_0x1d9cb0(0x196)](_0x1ef867);}return _0x267834;},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x28e)]=function(_0x258eef){const _0x279c32=_0xfbd732;if(!this[_0x279c32(0x318)](_0x258eef))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x258eef))return![];if(!this['meetsPassiveStateConditionJS'](_0x258eef))return![];if(!this[_0x279c32(0x2cb)](_0x258eef))return![];return!![];},Game_BattlerBase[_0xfbd732(0x248)]['meetsPassiveStateConditionClasses']=function(_0x242316){return!![];},Game_Actor['prototype'][_0xfbd732(0x318)]=function(_0x121bab){const _0x2cf7b7=_0xfbd732,_0x5ecaa0=_0x121bab['note'];if(_0x5ecaa0[_0x2cf7b7(0x1c9)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x36ac81=String(RegExp['$1'])['split'](',')[_0x2cf7b7(0x226)](_0x964be9=>_0x964be9[_0x2cf7b7(0x25a)]()),_0x1e121b=VisuMZ[_0x2cf7b7(0x377)][_0x2cf7b7(0x1a2)](_0x36ac81);return _0x1e121b['includes'](this['currentClass']());}if(_0x5ecaa0[_0x2cf7b7(0x1c9)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x46c06e=String(RegExp['$1'])[_0x2cf7b7(0x1cc)](',')['map'](_0x3dfb21=>_0x3dfb21[_0x2cf7b7(0x25a)]()),_0x5cb483=VisuMZ['SkillsStatesCore'][_0x2cf7b7(0x1a2)](_0x46c06e);let _0x3ef850=[this[_0x2cf7b7(0x381)]()];return Imported[_0x2cf7b7(0x396)]&&this['multiclasses']&&(_0x3ef850=this[_0x2cf7b7(0x21b)]()),_0x5cb483[_0x2cf7b7(0x243)](_0x5db0fd=>_0x3ef850[_0x2cf7b7(0x32e)](_0x5db0fd))[_0x2cf7b7(0x241)]>0x0;}return Game_BattlerBase[_0x2cf7b7(0x248)][_0x2cf7b7(0x318)][_0x2cf7b7(0x188)](this,_0x121bab);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1a2)]=function(_0x129029){const _0x446e21=_0xfbd732,_0x4c8de2=[];for(let _0x7ff818 of _0x129029){_0x7ff818=(String(_0x7ff818)||'')[_0x446e21(0x25a)]();const _0x62bad0=/^\d+$/[_0x446e21(0x386)](_0x7ff818);_0x62bad0?_0x4c8de2['push'](Number(_0x7ff818)):_0x4c8de2[_0x446e21(0x196)](DataManager['getClassIdWithName'](_0x7ff818));}return _0x4c8de2['map'](_0x223bef=>$dataClasses[Number(_0x223bef)])[_0x446e21(0x2b4)](null);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x191)]=function(_0x54ee94){const _0x246a20=_0xfbd732,_0x10a9bd=_0x54ee94[_0x246a20(0x1d4)];if(_0x10a9bd[_0x246a20(0x1c9)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x21dbbc=JSON[_0x246a20(0x263)]('['+RegExp['$1'][_0x246a20(0x1c9)](/\d+/g)+']');for(const _0x27f0cb of _0x21dbbc){if(!$gameSwitches['value'](_0x27f0cb))return![];}return!![];}if(_0x10a9bd['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x530bc1=JSON[_0x246a20(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x399103 of _0x530bc1){if(!$gameSwitches[_0x246a20(0x160)](_0x399103))return![];}return!![];}if(_0x10a9bd['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e8989=JSON[_0x246a20(0x263)]('['+RegExp['$1'][_0x246a20(0x1c9)](/\d+/g)+']');for(const _0x4bf4e5 of _0x4e8989){if($gameSwitches['value'](_0x4bf4e5))return!![];}return![];}if(_0x10a9bd['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5bcbe2=JSON[_0x246a20(0x263)]('['+RegExp['$1'][_0x246a20(0x1c9)](/\d+/g)+']');for(const _0x590c09 of _0x5bcbe2){if(!$gameSwitches[_0x246a20(0x160)](_0x590c09))return!![];}return![];}if(_0x10a9bd[_0x246a20(0x1c9)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a7672=JSON[_0x246a20(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x11b919 of _0x4a7672){if(!$gameSwitches[_0x246a20(0x160)](_0x11b919))return!![];}return![];}if(_0x10a9bd[_0x246a20(0x1c9)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5576d5=JSON[_0x246a20(0x263)]('['+RegExp['$1'][_0x246a20(0x1c9)](/\d+/g)+']');for(const _0xf041e8 of _0x5576d5){if($gameSwitches[_0x246a20(0x160)](_0xf041e8))return![];}return!![];}return!![];},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x26c)]=function(_0x18fab6){const _0x2ac146=_0xfbd732,_0x1ddc91=VisuMZ[_0x2ac146(0x377)][_0x2ac146(0x211)];if(_0x1ddc91[_0x18fab6['id']]&&!_0x1ddc91[_0x18fab6['id']][_0x2ac146(0x188)](this,_0x18fab6))return![];return!![];},Game_BattlerBase['prototype']['meetsPassiveStateGlobalConditionJS']=function(_0x2049de){const _0x587c64=_0xfbd732;return VisuMZ[_0x587c64(0x377)][_0x587c64(0x1ee)][_0x587c64(0x355)][_0x587c64(0x347)]['call'](this,_0x2049de);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x2c1)]=function(){const _0x21fe08=_0xfbd732;if(this[_0x21fe08(0x278)](_0x21fe08(0x2c1)))return this[_0x21fe08(0x1ec)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x21fe08(0x27d)]['passiveStates']=[],this[_0x21fe08(0x369)](),this[_0x21fe08(0x1b3)](),this['addPassiveStatesByPluginParameters'](),this[_0x21fe08(0x20c)]=undefined,this[_0x21fe08(0x1ec)]();},Game_BattlerBase['prototype'][_0xfbd732(0x369)]=function(){const _0x4c6e93=_0xfbd732;if(Imported[_0x4c6e93(0x23a)])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0xfbd732(0x248)]['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x1b3)]=function(){const _0x4fa82b=_0xfbd732,_0x593dbf=this[_0x4fa82b(0x27e)]();for(const _0x3b34f4 of _0x593dbf){if(!_0x3b34f4)continue;const _0x329ce9=_0x3b34f4[_0x4fa82b(0x1d4)]['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x329ce9)for(const _0x5e84be of _0x329ce9){_0x5e84be['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x4a45c7=RegExp['$1'];if(_0x4a45c7[_0x4fa82b(0x1c9)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x10c416=JSON['parse']('['+RegExp['$1'][_0x4fa82b(0x1c9)](/\d+/g)+']');this[_0x4fa82b(0x27d)]['passiveStates']=this[_0x4fa82b(0x27d)][_0x4fa82b(0x2c1)]['concat'](_0x10c416);}else{const _0x5dd4cf=_0x4a45c7['split'](',');for(const _0x349985 of _0x5dd4cf){const _0x2379e8=DataManager[_0x4fa82b(0x213)](_0x349985);if(_0x2379e8)this[_0x4fa82b(0x27d)][_0x4fa82b(0x2c1)][_0x4fa82b(0x196)](_0x2379e8);}}}}},Game_BattlerBase['prototype'][_0xfbd732(0x24f)]=function(){const _0x382f81=_0xfbd732,_0x5ebae3=VisuMZ[_0x382f81(0x377)][_0x382f81(0x1ee)][_0x382f81(0x355)][_0x382f81(0x2c6)];this['_cache'][_0x382f81(0x2c1)]=this['_cache'][_0x382f81(0x2c1)]['concat'](_0x5ebae3);},Game_BattlerBase['prototype']['stateTurns']=function(_0x2a0bb1){if(typeof _0x2a0bb1!=='number')_0x2a0bb1=_0x2a0bb1['id'];return this['_stateTurns'][_0x2a0bb1]||0x0;},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x260)]=function(_0x406879,_0xfe805){const _0x5e5d01=_0xfbd732;if(typeof _0x406879!=='number')_0x406879=_0x406879['id'];if(this[_0x5e5d01(0x327)](_0x406879)){const _0x2481b3=DataManager[_0x5e5d01(0x317)](_0x406879);this[_0x5e5d01(0x2d4)][_0x406879]=_0xfe805[_0x5e5d01(0x283)](0x0,_0x2481b3);if(this[_0x5e5d01(0x2d4)][_0x406879]<=0x0)this[_0x5e5d01(0x251)](_0x406879);}},Game_BattlerBase[_0xfbd732(0x248)]['addStateTurns']=function(_0x6a6259,_0x32355c){const _0x730dbc=_0xfbd732;if(typeof _0x6a6259!==_0x730dbc(0x2dc))_0x6a6259=_0x6a6259['id'];this['isStateAffected'](_0x6a6259)&&(_0x32355c+=this['stateTurns'](_0x6a6259),this['setStateTurns'](_0x6a6259,_0x32355c));},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x34f)]=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x18e)],Game_BattlerBase['prototype'][_0xfbd732(0x18e)]=function(_0x2aa023){const _0x535e6b=_0xfbd732,_0x29cecd=this[_0x535e6b(0x2ba)][_0x2aa023];VisuMZ[_0x535e6b(0x377)]['Game_BattlerBase_eraseBuff']['call'](this,_0x2aa023);if(_0x29cecd>0x0)this[_0x535e6b(0x2b2)](_0x2aa023);if(_0x29cecd<0x0)this[_0x535e6b(0x167)](_0x2aa023);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2e3)]=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x247)],Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x247)]=function(_0x3da8e0){const _0x6c048=_0xfbd732;VisuMZ[_0x6c048(0x377)][_0x6c048(0x2e3)][_0x6c048(0x188)](this,_0x3da8e0);if(!this[_0x6c048(0x3ab)](_0x3da8e0))this[_0x6c048(0x18e)](_0x3da8e0);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2dd)]=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x31e)],Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x31e)]=function(_0x2367a5){const _0x3856d1=_0xfbd732;VisuMZ[_0x3856d1(0x377)][_0x3856d1(0x2dd)][_0x3856d1(0x188)](this,_0x2367a5);if(!this['isBuffOrDebuffAffected'](_0x2367a5))this[_0x3856d1(0x18e)](_0x2367a5);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x2b2)]=function(_0x107428){},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x167)]=function(_0x4741aa){},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x1dd)]=function(_0x317678){const _0x4ccd6f=_0xfbd732;return this[_0x4ccd6f(0x2ba)][_0x317678]===VisuMZ[_0x4ccd6f(0x377)][_0x4ccd6f(0x1ee)]['Buffs'][_0x4ccd6f(0x36a)];},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x195)]=function(_0x9351a){const _0x1ea01b=_0xfbd732;return this[_0x1ea01b(0x2ba)][_0x9351a]===-VisuMZ['SkillsStatesCore'][_0x1ea01b(0x1ee)][_0x1ea01b(0x189)][_0x1ea01b(0x2a9)];},VisuMZ['SkillsStatesCore'][_0xfbd732(0x281)]=Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x351)],Game_BattlerBase['prototype'][_0xfbd732(0x351)]=function(_0x36aeb2,_0x256a1b){const _0x1729b6=_0xfbd732;return _0x36aeb2=_0x36aeb2[_0x1729b6(0x283)](-0x2,0x2),VisuMZ[_0x1729b6(0x377)][_0x1729b6(0x281)][_0x1729b6(0x188)](this,_0x36aeb2,_0x256a1b);},Game_BattlerBase['prototype'][_0xfbd732(0x326)]=function(_0x326d62){const _0x3916d2=_0xfbd732,_0x10f1ba=this['_buffs'][_0x326d62];return VisuMZ[_0x3916d2(0x377)][_0x3916d2(0x1ee)][_0x3916d2(0x189)][_0x3916d2(0x2c8)]['call'](this,_0x326d62,_0x10f1ba);},Game_BattlerBase[_0xfbd732(0x248)]['buffTurns']=function(_0x1b4c73){const _0x414d50=_0xfbd732;return this[_0x414d50(0x2b3)][_0x1b4c73]||0x0;},Game_BattlerBase['prototype'][_0xfbd732(0x25b)]=function(_0x4cc02e){const _0x230c7a=_0xfbd732;return this[_0x230c7a(0x270)](_0x4cc02e);},Game_BattlerBase[_0xfbd732(0x248)]['setBuffTurns']=function(_0x4ddeba,_0x594bfb){const _0x553840=_0xfbd732;if(this[_0x553840(0x360)](_0x4ddeba)){const _0x5e263b=VisuMZ[_0x553840(0x377)][_0x553840(0x1ee)][_0x553840(0x189)][_0x553840(0x1ea)];this['_buffTurns'][_0x4ddeba]=_0x594bfb[_0x553840(0x283)](0x0,_0x5e263b);}},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x2cf)]=function(_0x3f303c,_0x1864be){const _0x527eca=_0xfbd732;this[_0x527eca(0x360)](_0x3f303c)&&(_0x1864be+=this[_0x527eca(0x270)](stateId),this[_0x527eca(0x260)](_0x3f303c,_0x1864be));},Game_BattlerBase['prototype'][_0xfbd732(0x37d)]=function(_0x59d317,_0x4dfcb9){const _0x120fbe=_0xfbd732;if(this[_0x120fbe(0x16b)](_0x59d317)){const _0x5efd16=VisuMZ[_0x120fbe(0x377)]['Settings'][_0x120fbe(0x189)][_0x120fbe(0x1ea)];this['_buffTurns'][_0x59d317]=_0x4dfcb9[_0x120fbe(0x283)](0x0,_0x5efd16);}},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x182)]=function(_0x4d736f,_0x4e4f99){const _0x4c2df7=_0xfbd732;this[_0x4c2df7(0x16b)](_0x4d736f)&&(_0x4e4f99+=this[_0x4c2df7(0x270)](stateId),this[_0x4c2df7(0x260)](_0x4d736f,_0x4e4f99));},Game_BattlerBase[_0xfbd732(0x248)]['stateData']=function(_0x58dce5){const _0x530adb=_0xfbd732;if(typeof _0x58dce5!=='number')_0x58dce5=_0x58dce5['id'];return this['_stateData']=this[_0x530adb(0x2a6)]||{},this[_0x530adb(0x2a6)][_0x58dce5]=this['_stateData'][_0x58dce5]||{},this['_stateData'][_0x58dce5];},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x1ca)]=function(_0x7a5c3d,_0x33f949){const _0x2944c2=_0xfbd732;if(typeof _0x7a5c3d!=='number')_0x7a5c3d=_0x7a5c3d['id'];const _0x5d5eea=this[_0x2944c2(0x385)](_0x7a5c3d);return _0x5d5eea[_0x33f949];},Game_BattlerBase[_0xfbd732(0x248)]['setStateData']=function(_0x5eae25,_0x7bfe89,_0x478fb6){const _0x3c71e5=_0xfbd732;if(typeof _0x5eae25!==_0x3c71e5(0x2dc))_0x5eae25=_0x5eae25['id'];const _0x1ca9f3=this[_0x3c71e5(0x385)](_0x5eae25);_0x1ca9f3[_0x7bfe89]=_0x478fb6;},Game_BattlerBase[_0xfbd732(0x248)]['clearStateData']=function(_0x18b365){const _0x495d2a=_0xfbd732;if(typeof _0x18b365!=='number')_0x18b365=_0x18b365['id'];this['_stateData']=this[_0x495d2a(0x2a6)]||{},this[_0x495d2a(0x2a6)][_0x18b365]={};},Game_BattlerBase['prototype'][_0xfbd732(0x338)]=function(_0x529558){const _0x13c76b=_0xfbd732;if(typeof _0x529558!=='number')_0x529558=_0x529558['id'];return this[_0x13c76b(0x225)]=this[_0x13c76b(0x225)]||{},this[_0x13c76b(0x225)][_0x529558]===undefined&&(this['_stateDisplay'][_0x529558]=''),this['_stateDisplay'][_0x529558];},Game_BattlerBase['prototype'][_0xfbd732(0x303)]=function(_0x1a78ce,_0xb2ff6c){const _0x39f44f=_0xfbd732;if(typeof _0x1a78ce!==_0x39f44f(0x2dc))_0x1a78ce=_0x1a78ce['id'];this[_0x39f44f(0x225)]=this[_0x39f44f(0x225)]||{},this[_0x39f44f(0x225)][_0x1a78ce]=_0xb2ff6c;},Game_BattlerBase[_0xfbd732(0x248)]['clearStateDisplay']=function(_0x1ad46b){const _0x30cbc3=_0xfbd732;if(typeof _0x1ad46b!==_0x30cbc3(0x2dc))_0x1ad46b=_0x1ad46b['id'];this[_0x30cbc3(0x225)]=this[_0x30cbc3(0x225)]||{},this[_0x30cbc3(0x225)][_0x1ad46b]='';},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x218)]=function(_0x4da461){const _0x589137=_0xfbd732;if(typeof _0x4da461!=='number')_0x4da461=_0x4da461['id'];this[_0x589137(0x279)]=this[_0x589137(0x279)]||{},this[_0x589137(0x279)][_0x4da461]=this[_0x589137(0x279)][_0x4da461]||_0x589137(0x2d5);const _0x106a6d=this['_stateOrigin'][_0x4da461];return this['getStateOriginByKey'](_0x106a6d);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x34c)]=function(_0x22d1c7,_0x974320){const _0x55c3f2=_0xfbd732;this['_stateOrigin']=this[_0x55c3f2(0x279)]||{};const _0x58bd20=_0x974320?this[_0x55c3f2(0x29c)](_0x974320):this['getCurrentStateOriginKey']();this[_0x55c3f2(0x279)][_0x22d1c7]=_0x58bd20;},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x3a2)]=function(_0x30e307){const _0x35267a=_0xfbd732;this[_0x35267a(0x279)]=this[_0x35267a(0x279)]||{},delete this[_0x35267a(0x279)][_0x30e307];},Game_BattlerBase[_0xfbd732(0x248)]['getCurrentStateOriginKey']=function(){const _0x7899df=_0xfbd732,_0x4da36a=this[_0x7899df(0x210)]();return this[_0x7899df(0x29c)](_0x4da36a);},Game_BattlerBase[_0xfbd732(0x248)]['getCurrentStateActiveUser']=function(){const _0x13118d=_0xfbd732;if($gameParty[_0x13118d(0x249)]()){if(BattleManager[_0x13118d(0x277)])return BattleManager[_0x13118d(0x277)];else{if(BattleManager[_0x13118d(0x259)])return BattleManager['_currentActor'];}}else{const _0x3d3876=SceneManager['_scene'];if(![Scene_Map,Scene_Item][_0x13118d(0x32e)](_0x3d3876[_0x13118d(0x1ce)]))return $gameParty[_0x13118d(0x23f)]();}return this;},Game_BattlerBase['prototype'][_0xfbd732(0x29c)]=function(_0x39d1b5){const _0x5d423f=_0xfbd732;if(!_0x39d1b5)return _0x5d423f(0x2d5);if(_0x39d1b5[_0x5d423f(0x1af)]())return'<actor-%1>'['format'](_0x39d1b5[_0x5d423f(0x1e3)]());else{const _0x2227fb='<enemy-%1>'['format'](_0x39d1b5['enemyId']()),_0x4457e3=_0x5d423f(0x2fe)[_0x5d423f(0x336)](_0x39d1b5[_0x5d423f(0x3a7)]()),_0x2244b7=_0x5d423f(0x23b)['format']($gameTroop[_0x5d423f(0x38f)]());return _0x5d423f(0x2bc)[_0x5d423f(0x336)](_0x2227fb,_0x4457e3,_0x2244b7);}return _0x5d423f(0x2d5);},Game_BattlerBase[_0xfbd732(0x248)]['getStateOriginByKey']=function(_0xc3b819){const _0x340708=_0xfbd732;if(_0xc3b819==='user')return this;else{if(_0xc3b819['match'](/<actor-(\d+)>/i))return $gameActors[_0x340708(0x30b)](Number(RegExp['$1']));else{if($gameParty[_0x340708(0x249)]()&&_0xc3b819['match'](/<troop-(\d+)>/i)){const _0x205aab=Number(RegExp['$1']);if(_0x205aab===$gameTroop[_0x340708(0x38f)]()){if(_0xc3b819[_0x340708(0x1c9)](/<member-(\d+)>/i))return $gameTroop[_0x340708(0x372)]()[Number(RegExp['$1'])];}}if(_0xc3b819[_0x340708(0x1c9)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x22c)]=Game_Battler['prototype'][_0xfbd732(0x254)],Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x254)]=function(_0x35151c){const _0x5add69=_0xfbd732,_0x2dd7dd=this[_0x5add69(0x1c8)](_0x35151c);VisuMZ['SkillsStatesCore'][_0x5add69(0x22c)][_0x5add69(0x188)](this,_0x35151c);if(_0x2dd7dd&&this['hasState']($dataStates[_0x35151c])){this[_0x5add69(0x38c)](_0x35151c);;}},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1b0)]=Game_Battler['prototype'][_0xfbd732(0x1c8)],Game_Battler[_0xfbd732(0x248)]['isStateAddable']=function(_0x53b3d1){const _0x32b982=_0xfbd732,_0x1e2f11=$dataStates[_0x53b3d1];if(_0x1e2f11&&_0x1e2f11[_0x32b982(0x1d4)][_0x32b982(0x1c9)](/<NO DEATH CLEAR>/i))return!this['isStateResist'](_0x53b3d1)&&!this[_0x32b982(0x258)](_0x53b3d1)&&!this[_0x32b982(0x173)][_0x32b982(0x19a)](_0x53b3d1);return VisuMZ[_0x32b982(0x377)][_0x32b982(0x1b0)]['call'](this,_0x53b3d1);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x38c)]=function(_0x2b372e){const _0x478731=_0xfbd732;this['setStateOrigin'](_0x2b372e),this['onAddStateMakeCustomSlipValues'](_0x2b372e),this[_0x478731(0x244)](_0x2b372e),this['onAddStateGlobalJS'](_0x2b372e);},Game_Battler['prototype'][_0xfbd732(0x321)]=function(_0x506dc0){const _0x1702af=_0xfbd732;Game_BattlerBase[_0x1702af(0x248)][_0x1702af(0x321)]['call'](this,_0x506dc0),this[_0x1702af(0x235)](_0x506dc0),this[_0x1702af(0x345)](_0x506dc0);},Game_Battler['prototype'][_0xfbd732(0x379)]=function(_0x29c36b){const _0x1aad1f=_0xfbd732;for(const _0x96ace1 of this['states']()){this[_0x1aad1f(0x2a0)](_0x96ace1['id'])&&_0x96ace1[_0x1aad1f(0x2b6)]===_0x29c36b&&(this[_0x1aad1f(0x251)](_0x96ace1['id']),this[_0x1aad1f(0x237)](_0x96ace1['id']),this[_0x1aad1f(0x2f6)](_0x96ace1['id']));}},Game_Battler[_0xfbd732(0x248)]['onExpireState']=function(_0x4c41a3){const _0x126d5b=_0xfbd732;this[_0x126d5b(0x26a)](_0x4c41a3);},Game_Battler[_0xfbd732(0x248)]['onAddStateCustomJS']=function(_0x2ebc23){const _0x3fcbbe=_0xfbd732;if(this[_0x3fcbbe(0x306)]||this[_0x3fcbbe(0x26d)])return;const _0x24931b=VisuMZ['SkillsStatesCore']['stateAddJS'];if(_0x24931b[_0x2ebc23])_0x24931b[_0x2ebc23][_0x3fcbbe(0x188)](this,_0x2ebc23);},Game_Battler[_0xfbd732(0x248)]['onEraseStateCustomJS']=function(_0x355f33){const _0x1016bb=_0xfbd732;if(this[_0x1016bb(0x306)]||this[_0x1016bb(0x26d)])return;const _0x50a134=VisuMZ['SkillsStatesCore']['stateEraseJS'];if(_0x50a134[_0x355f33])_0x50a134[_0x355f33][_0x1016bb(0x188)](this,_0x355f33);},Game_Battler['prototype'][_0xfbd732(0x26a)]=function(_0x18d0b3){const _0x541cb1=_0xfbd732;if(this[_0x541cb1(0x306)]||this[_0x541cb1(0x26d)])return;const _0x4f4aab=VisuMZ['SkillsStatesCore'][_0x541cb1(0x222)];if(_0x4f4aab[_0x18d0b3])_0x4f4aab[_0x18d0b3]['call'](this,_0x18d0b3);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x29a)]=function(_0x589158){const _0x12f9d8=_0xfbd732;if(this[_0x12f9d8(0x306)]||this[_0x12f9d8(0x26d)])return;try{VisuMZ[_0x12f9d8(0x377)][_0x12f9d8(0x1ee)][_0x12f9d8(0x264)][_0x12f9d8(0x22a)]['call'](this,_0x589158);}catch(_0x5e895e){if($gameTemp[_0x12f9d8(0x265)]())console['log'](_0x5e895e);}},Game_Battler[_0xfbd732(0x248)]['onEraseStateGlobalJS']=function(_0x45c2c8){const _0x6198c4=_0xfbd732;if(this[_0x6198c4(0x306)]||this[_0x6198c4(0x26d)])return;try{VisuMZ[_0x6198c4(0x377)][_0x6198c4(0x1ee)][_0x6198c4(0x264)]['onEraseStateJS']['call'](this,_0x45c2c8);}catch(_0x450f52){if($gameTemp[_0x6198c4(0x265)]())console[_0x6198c4(0x352)](_0x450f52);}},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x2f6)]=function(_0x171b6f){const _0x9e8ba5=_0xfbd732;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ[_0x9e8ba5(0x377)][_0x9e8ba5(0x1ee)][_0x9e8ba5(0x264)]['onExpireStateJS'][_0x9e8ba5(0x188)](this,_0x171b6f);}catch(_0x33d74d){if($gameTemp[_0x9e8ba5(0x265)]())console[_0x9e8ba5(0x352)](_0x33d74d);}},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x29f)]=function(_0x28656f){const _0x21312a=_0xfbd732;return _0x28656f=_0x28656f[_0x21312a(0x390)]()[_0x21312a(0x25a)](),this[_0x21312a(0x2a7)]()[_0x21312a(0x243)](_0x232cf4=>_0x232cf4[_0x21312a(0x1c0)]['includes'](_0x28656f));},Game_Battler['prototype'][_0xfbd732(0x2d2)]=function(_0x3d99dd,_0x1e64ff){const _0x48afcd=_0xfbd732;_0x3d99dd=_0x3d99dd[_0x48afcd(0x390)]()['trim'](),_0x1e64ff=_0x1e64ff||0x0;const _0x28fa0e=this[_0x48afcd(0x29f)](_0x3d99dd),_0x4d2fd2=[];for(const _0x190741 of _0x28fa0e){if(!_0x190741)continue;if(_0x1e64ff<=0x0)return;_0x4d2fd2[_0x48afcd(0x196)](_0x190741['id']),this[_0x48afcd(0x173)][_0x48afcd(0x384)]=!![],_0x1e64ff--;}while(_0x4d2fd2[_0x48afcd(0x241)]>0x0){this['removeState'](_0x4d2fd2[_0x48afcd(0x183)]());}},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x3a4)]=function(_0x161706){const _0x1d57d0=_0xfbd732;_0x161706=_0x161706[_0x1d57d0(0x390)]()[_0x1d57d0(0x25a)]();const _0x2a37ed=this[_0x1d57d0(0x29f)](_0x161706),_0x493ed0=[];for(const _0x169deb of _0x2a37ed){if(!_0x169deb)continue;_0x493ed0[_0x1d57d0(0x196)](_0x169deb['id']),this['_result'][_0x1d57d0(0x384)]=!![];}while(_0x493ed0[_0x1d57d0(0x241)]>0x0){this[_0x1d57d0(0x251)](_0x493ed0[_0x1d57d0(0x183)]());}},Game_Battler['prototype']['isStateCategoryAffected']=function(_0x24a187){return this['totalStateCategoryAffected'](_0x24a187)>0x0;},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x16c)]=function(_0x566ed6){const _0x41c45b=_0xfbd732;return this[_0x41c45b(0x34b)](_0x566ed6)>0x0;},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x36b)]=function(_0x3c82e1){const _0x572f35=_0xfbd732,_0x2aa86b=this[_0x572f35(0x29f)](_0x3c82e1)[_0x572f35(0x243)](_0x1707d9=>this[_0x572f35(0x327)](_0x1707d9['id']));return _0x2aa86b[_0x572f35(0x241)];},Game_Battler[_0xfbd732(0x248)]['totalStateCategory']=function(_0x25e46a){const _0xeeb61c=_0xfbd732,_0x226d5c=this[_0xeeb61c(0x29f)](_0x25e46a);return _0x226d5c[_0xeeb61c(0x241)];},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1eb)]=Game_Battler['prototype'][_0xfbd732(0x178)],Game_Battler[_0xfbd732(0x248)]['addBuff']=function(_0x44929e,_0x5f0070){const _0x1afc61=_0xfbd732;VisuMZ['SkillsStatesCore'][_0x1afc61(0x1eb)][_0x1afc61(0x188)](this,_0x44929e,_0x5f0070),this[_0x1afc61(0x360)](_0x44929e)&&this['onAddBuff'](_0x44929e,_0x5f0070);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x1ae)]=function(_0x1e7eae){},VisuMZ[_0xfbd732(0x377)]['Game_Battler_addDebuff']=Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x184)],Game_Battler['prototype'][_0xfbd732(0x184)]=function(_0xf3cd0c,_0x2215c2){VisuMZ['SkillsStatesCore']['Game_Battler_addDebuff']['call'](this,_0xf3cd0c,_0x2215c2),this['isDebuffAffected'](_0xf3cd0c)&&this['onAddDebuff'](_0xf3cd0c,_0x2215c2);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x2b8)]=function(){const _0x18513e=_0xfbd732;for(let _0x160a55=0x0;_0x160a55<this['buffLength']();_0x160a55++){if(this[_0x18513e(0x32d)](_0x160a55)){const _0x295fe4=this[_0x18513e(0x2ba)][_0x160a55];this[_0x18513e(0x1aa)](_0x160a55);if(_0x295fe4>0x0)this[_0x18513e(0x285)](_0x160a55);if(_0x295fe4<0x0)this[_0x18513e(0x21c)](_0x160a55);}}},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x1d3)]=function(_0x17542f,_0x2f3a60){const _0x118a30=_0xfbd732;this[_0x118a30(0x329)](_0x17542f,_0x2f3a60);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x2c9)]=function(_0x1e6ae0,_0x34942f){const _0x378c0c=_0xfbd732;this[_0x378c0c(0x30a)](_0x1e6ae0,_0x34942f);},Game_Battler[_0xfbd732(0x248)]['onEraseBuff']=function(_0x5ceb7f){const _0x2f346a=_0xfbd732;Game_BattlerBase[_0x2f346a(0x248)][_0x2f346a(0x2b2)]['call'](this,_0x5ceb7f),this[_0x2f346a(0x2c7)](_0x5ceb7f);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x167)]=function(_0x1ab681){const _0x562828=_0xfbd732;Game_BattlerBase[_0x562828(0x248)][_0x562828(0x167)][_0x562828(0x188)](this,_0x1ab681),this['onEraseDebuffGlobalJS'](_0x1ab681);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x285)]=function(_0x485ea4){const _0x2f9d5a=_0xfbd732;this[_0x2f9d5a(0x32f)](_0x485ea4);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x21c)]=function(_0x18e434){this['onExpireDebuffGlobalJS'](_0x18e434);},Game_Battler['prototype'][_0xfbd732(0x329)]=function(_0x4d8286,_0x16aa5f){const _0x639c0f=_0xfbd732;VisuMZ[_0x639c0f(0x377)][_0x639c0f(0x1ee)][_0x639c0f(0x189)][_0x639c0f(0x239)][_0x639c0f(0x188)](this,_0x4d8286,_0x16aa5f);},Game_Battler['prototype'][_0xfbd732(0x30a)]=function(_0xc1293a,_0x5912d1){const _0x34c803=_0xfbd732;VisuMZ[_0x34c803(0x377)][_0x34c803(0x1ee)][_0x34c803(0x189)][_0x34c803(0x162)][_0x34c803(0x188)](this,_0xc1293a,_0x5912d1);},Game_BattlerBase['prototype'][_0xfbd732(0x2c7)]=function(_0x2911eb){const _0x2f6923=_0xfbd732;VisuMZ[_0x2f6923(0x377)][_0x2f6923(0x1ee)][_0x2f6923(0x189)][_0x2f6923(0x164)][_0x2f6923(0x188)](this,_0x2911eb);},Game_BattlerBase[_0xfbd732(0x248)][_0xfbd732(0x180)]=function(_0x193d97){const _0x30b94c=_0xfbd732;VisuMZ[_0x30b94c(0x377)]['Settings'][_0x30b94c(0x189)][_0x30b94c(0x37e)][_0x30b94c(0x188)](this,_0x193d97);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x32f)]=function(_0x2a819c){const _0x2fbaa8=_0xfbd732;VisuMZ[_0x2fbaa8(0x377)][_0x2fbaa8(0x1ee)][_0x2fbaa8(0x189)][_0x2fbaa8(0x33f)][_0x2fbaa8(0x188)](this,_0x2a819c);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x2af)]=function(_0x11028f){const _0x34723f=_0xfbd732;VisuMZ['SkillsStatesCore']['Settings'][_0x34723f(0x189)][_0x34723f(0x228)][_0x34723f(0x188)](this,_0x11028f);},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x2d9)]=function(_0x11ff92){const _0xc2cbc8=_0xfbd732,_0x1f740c=VisuMZ['SkillsStatesCore'],_0x4d69a7=[_0xc2cbc8(0x25e),_0xc2cbc8(0x17b),_0xc2cbc8(0x224),'stateMpSlipHealJS','stateTpSlipDamageJS',_0xc2cbc8(0x391)];for(const _0x268200 of _0x4d69a7){_0x1f740c[_0x268200][_0x11ff92]&&_0x1f740c[_0x268200][_0x11ff92][_0xc2cbc8(0x188)](this,_0x11ff92);}},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x201)]=Game_Battler['prototype']['regenerateAll'],Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x39a)]=function(){const _0x4da31c=_0xfbd732;this[_0x4da31c(0x28a)](),VisuMZ[_0x4da31c(0x377)][_0x4da31c(0x201)][_0x4da31c(0x188)](this),this[_0x4da31c(0x1d8)](),this[_0x4da31c(0x257)]();},Game_Battler['prototype']['setPassiveStateSlipDamageJS']=function(){const _0x34b442=_0xfbd732;for(const _0x2602f5 of this[_0x34b442(0x2c1)]()){if(!_0x2602f5)continue;this[_0x34b442(0x2d9)](_0x2602f5['id']);}},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x28a)]=function(){const _0x2f1107=_0xfbd732;for(const _0x5f32a9 of this[_0x2f1107(0x2a7)]()){if(!_0x5f32a9)continue;_0x5f32a9[_0x2f1107(0x1d4)]['match'](/<JS SLIP REFRESH>/i)&&this[_0x2f1107(0x2d9)](_0x5f32a9['id']);}},Game_Battler[_0xfbd732(0x248)][_0xfbd732(0x257)]=function(){const _0x54a0c4=_0xfbd732;if(!this[_0x54a0c4(0x334)]())return;const _0x5bce08=this[_0x54a0c4(0x2a7)]();for(const _0x5d54b3 of _0x5bce08){if(!_0x5d54b3)continue;this[_0x54a0c4(0x1b6)](_0x5d54b3);}},Game_Battler[_0xfbd732(0x248)]['onRegenerateCustomStateDamageOverTime']=function(_0xa68cb){const _0x5242ca=_0xfbd732,_0x4e7060=this[_0x5242ca(0x1ca)](_0xa68cb['id'],_0x5242ca(0x1d1))||0x0,_0x28731b=-this[_0x5242ca(0x20f)](),_0x118373=Math[_0x5242ca(0x368)](_0x4e7060,_0x28731b);if(_0x118373!==0x0)this[_0x5242ca(0x25f)](_0x118373);const _0x5baaa4=this['getStateData'](_0xa68cb['id'],'slipMp')||0x0;if(_0x5baaa4!==0x0)this[_0x5242ca(0x25c)](_0x5baaa4);const _0x51e8dd=this[_0x5242ca(0x1ca)](_0xa68cb['id'],'slipTp')||0x0;if(_0x51e8dd!==0x0)this[_0x5242ca(0x31d)](_0x51e8dd);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1bf)]=Game_Actor[_0xfbd732(0x248)][_0xfbd732(0x3aa)],Game_Actor[_0xfbd732(0x248)]['skillTypes']=function(){const _0x3a7f89=_0xfbd732,_0x2669d6=VisuMZ[_0x3a7f89(0x377)][_0x3a7f89(0x1bf)]['call'](this),_0x5ee5ca=VisuMZ[_0x3a7f89(0x377)][_0x3a7f89(0x1ee)]['Skills'];let _0x2bd109=_0x5ee5ca[_0x3a7f89(0x219)];return $gameParty['inBattle']()&&(_0x2bd109=_0x2bd109[_0x3a7f89(0x37f)](_0x5ee5ca[_0x3a7f89(0x1cd)])),_0x2669d6[_0x3a7f89(0x243)](_0x3a3425=>!_0x2bd109[_0x3a7f89(0x32e)](_0x3a3425));},Game_Actor[_0xfbd732(0x248)][_0xfbd732(0x255)]=function(){const _0xafefad=_0xfbd732;return this[_0xafefad(0x2e2)]()[_0xafefad(0x243)](_0x23129e=>this[_0xafefad(0x34e)](_0x23129e));},Game_Actor[_0xfbd732(0x248)]['isSkillUsableForAutoBattle']=function(_0x78f4f3){const _0x213e81=_0xfbd732;if(!this[_0x213e81(0x33b)](_0x78f4f3))return![];const _0x3ae9ca=this[_0x213e81(0x3aa)](),_0x4766a8=DataManager[_0x213e81(0x2f8)](_0x78f4f3),_0x4170a2=_0x3ae9ca[_0x213e81(0x243)](_0x2f9153=>_0x4766a8['includes'](_0x2f9153));return _0x4170a2['length']>0x0;},Game_Actor[_0xfbd732(0x248)][_0xfbd732(0x27e)]=function(){const _0x3c57e0=_0xfbd732;let _0x39e37c=[this[_0x3c57e0(0x30b)](),this[_0x3c57e0(0x381)]()];_0x39e37c=_0x39e37c[_0x3c57e0(0x37f)](this['equips']()[_0x3c57e0(0x243)](_0x474f49=>_0x474f49));for(const _0x9cf142 of this['_skills']){const _0x2a9f4d=$dataSkills[_0x9cf142];if(_0x2a9f4d)_0x39e37c['push'](_0x2a9f4d);}return _0x39e37c;},Game_Actor[_0xfbd732(0x248)][_0xfbd732(0x24f)]=function(){const _0x3e6d84=_0xfbd732;Game_Battler[_0x3e6d84(0x248)][_0x3e6d84(0x24f)][_0x3e6d84(0x188)](this);const _0x2011e1=VisuMZ[_0x3e6d84(0x377)][_0x3e6d84(0x1ee)][_0x3e6d84(0x355)]['Actor'];this[_0x3e6d84(0x27d)][_0x3e6d84(0x2c1)]=this[_0x3e6d84(0x27d)]['passiveStates'][_0x3e6d84(0x37f)](_0x2011e1);},VisuMZ['SkillsStatesCore'][_0xfbd732(0x19d)]=Game_Actor[_0xfbd732(0x248)][_0xfbd732(0x361)],Game_Actor[_0xfbd732(0x248)][_0xfbd732(0x361)]=function(_0x408789){const _0x34e0e5=_0xfbd732;VisuMZ[_0x34e0e5(0x377)][_0x34e0e5(0x19d)]['call'](this,_0x408789),this[_0x34e0e5(0x27d)]={};},VisuMZ['SkillsStatesCore']['Game_Actor_forgetSkill']=Game_Actor[_0xfbd732(0x248)][_0xfbd732(0x367)],Game_Actor['prototype'][_0xfbd732(0x367)]=function(_0x4bd210){const _0x5c73ee=_0xfbd732;VisuMZ[_0x5c73ee(0x377)][_0x5c73ee(0x25d)][_0x5c73ee(0x188)](this,_0x4bd210),this['_cache']={};},Game_Enemy['prototype'][_0xfbd732(0x27e)]=function(){const _0x22feb4=_0xfbd732;let _0x2fca7f=[this[_0x22feb4(0x399)]()];return _0x2fca7f[_0x22feb4(0x37f)](this[_0x22feb4(0x2e2)]());},Game_Enemy[_0xfbd732(0x248)][_0xfbd732(0x24f)]=function(){const _0x5627e8=_0xfbd732;Game_Battler[_0x5627e8(0x248)]['addPassiveStatesByPluginParameters'][_0x5627e8(0x188)](this);const _0x459566=VisuMZ[_0x5627e8(0x377)][_0x5627e8(0x1ee)]['PassiveStates'][_0x5627e8(0x33e)];this[_0x5627e8(0x27d)][_0x5627e8(0x2c1)]=this[_0x5627e8(0x27d)]['passiveStates'][_0x5627e8(0x37f)](_0x459566);},Game_Enemy[_0xfbd732(0x248)]['skills']=function(){const _0xa5857e=_0xfbd732,_0x134a88=[];for(const _0x25dfc2 of this[_0xa5857e(0x399)]()[_0xa5857e(0x291)]){const _0x33b719=$dataSkills[_0x25dfc2['skillId']];if(_0x33b719&&!_0x134a88[_0xa5857e(0x32e)](_0x33b719))_0x134a88[_0xa5857e(0x196)](_0x33b719);}return _0x134a88;},Game_Enemy[_0xfbd732(0x248)][_0xfbd732(0x388)]=function(_0x46027f){return this['hasState']($dataStates[_0x46027f]);},VisuMZ['SkillsStatesCore'][_0xfbd732(0x292)]=Game_Unit[_0xfbd732(0x248)][_0xfbd732(0x358)],Game_Unit[_0xfbd732(0x248)][_0xfbd732(0x358)]=function(){const _0x1e6f20=_0xfbd732;if(this[_0x1e6f20(0x2c2)]())return!![];return VisuMZ['SkillsStatesCore'][_0x1e6f20(0x292)]['call'](this);},Game_Unit[_0xfbd732(0x248)]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x4d63a0=_0xfbd732,_0x3dd777=this['aliveMembers']();for(const _0x4c04cd of _0x3dd777){if(!_0x4c04cd[_0x4d63a0(0x343)]())return![];}return!![];},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x17d)]=Game_Troop[_0xfbd732(0x248)][_0xfbd732(0x23d)],Game_Troop[_0xfbd732(0x248)][_0xfbd732(0x23d)]=function(_0x5f2347){const _0x39c507=_0xfbd732;VisuMZ[_0x39c507(0x377)][_0x39c507(0x17d)]['call'](this,_0x5f2347),this[_0x39c507(0x1ac)]();},Game_Troop['prototype'][_0xfbd732(0x1ac)]=function(){const _0x16bf0b=_0xfbd732;this[_0x16bf0b(0x323)]=Graphics['frameCount'];},Game_Troop[_0xfbd732(0x248)][_0xfbd732(0x38f)]=function(){const _0x7be67b=_0xfbd732;return this[_0x7be67b(0x323)]=this['_currentTroopUniqueID']||Graphics[_0x7be67b(0x2e6)],this[_0x7be67b(0x323)];},Scene_Skill[_0xfbd732(0x248)]['isBottomHelpMode']=function(){const _0x4afb9f=_0xfbd732;if(ConfigManager[_0x4afb9f(0x2e4)]&&ConfigManager[_0x4afb9f(0x21a)]!==undefined)return ConfigManager[_0x4afb9f(0x21a)];else{if(this[_0x4afb9f(0x26f)]())return this[_0x4afb9f(0x2c5)]()[_0x4afb9f(0x1c9)](/LOWER/i);else Scene_ItemBase[_0x4afb9f(0x248)][_0x4afb9f(0x33a)][_0x4afb9f(0x188)](this);}},Scene_Skill[_0xfbd732(0x248)]['isRightInputMode']=function(){const _0x44b119=_0xfbd732;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x44b119(0x340)]!==undefined)return ConfigManager[_0x44b119(0x340)];else return this['isUseSkillsStatesCoreUpdatedLayout']()?this['updatedLayoutStyle']()['match'](/RIGHT/i):Scene_ItemBase[_0x44b119(0x248)][_0x44b119(0x33a)][_0x44b119(0x188)](this);},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x2c5)]=function(){const _0x3d66e4=_0xfbd732;return VisuMZ['SkillsStatesCore'][_0x3d66e4(0x1ee)][_0x3d66e4(0x234)][_0x3d66e4(0x221)];},Scene_Skill[_0xfbd732(0x248)]['isUseModernControls']=function(){const _0x404dba=_0xfbd732;return this[_0x404dba(0x21d)]&&this[_0x404dba(0x21d)][_0x404dba(0x1ef)]();},Scene_Skill['prototype'][_0xfbd732(0x26f)]=function(){const _0x13f0e9=_0xfbd732;return VisuMZ[_0x13f0e9(0x377)][_0x13f0e9(0x1ee)][_0x13f0e9(0x234)]['EnableLayout'];},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2b9)]=Scene_Skill['prototype'][_0xfbd732(0x274)],Scene_Skill['prototype']['helpWindowRect']=function(){const _0x683dfc=_0xfbd732;return this[_0x683dfc(0x26f)]()?this[_0x683dfc(0x332)]():VisuMZ[_0x683dfc(0x377)][_0x683dfc(0x2b9)][_0x683dfc(0x188)](this);},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x332)]=function(){const _0x132f27=_0xfbd732,_0xde7af4=0x0,_0x333fa8=this[_0x132f27(0x161)](),_0x14f820=Graphics[_0x132f27(0x18f)],_0x4f81ea=this[_0x132f27(0x19f)]();return new Rectangle(_0xde7af4,_0x333fa8,_0x14f820,_0x4f81ea);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1c7)]=Scene_Skill[_0xfbd732(0x248)]['skillTypeWindowRect'],Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x364)]=function(){const _0x38875e=_0xfbd732;return this[_0x38875e(0x26f)]()?this[_0x38875e(0x1c2)]():VisuMZ[_0x38875e(0x377)]['Scene_Skill_skillTypeWindowRect'][_0x38875e(0x188)](this);},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x1c2)]=function(){const _0x4e26a3=_0xfbd732,_0x2aa891=this[_0x4e26a3(0x38d)](),_0x291283=this['calcWindowHeight'](0x3,!![]),_0x517acd=this['isRightInputMode']()?Graphics[_0x4e26a3(0x18f)]-_0x2aa891:0x0,_0x130265=this[_0x4e26a3(0x300)]();return new Rectangle(_0x517acd,_0x130265,_0x2aa891,_0x291283);},VisuMZ[_0xfbd732(0x377)]['Scene_Skill_statusWindowRect']=Scene_Skill[_0xfbd732(0x248)]['statusWindowRect'],Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x1e0)]=function(){const _0x327f77=_0xfbd732;return this['isUseSkillsStatesCoreUpdatedLayout']()?this['statusWindowRectSkillsStatesCore']():VisuMZ[_0x327f77(0x377)][_0x327f77(0x2f7)][_0x327f77(0x188)](this);},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x357)]=function(){const _0x18e467=_0xfbd732,_0x27fca2=Graphics[_0x18e467(0x18f)]-this[_0x18e467(0x38d)](),_0x120ed1=this['_skillTypeWindow']['height'],_0x1978da=this['isRightInputMode']()?0x0:Graphics[_0x18e467(0x18f)]-_0x27fca2,_0x486fbc=this[_0x18e467(0x300)]();return new Rectangle(_0x1978da,_0x486fbc,_0x27fca2,_0x120ed1);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x176)]=Scene_Skill[_0xfbd732(0x248)]['createItemWindow'],Scene_Skill[_0xfbd732(0x248)]['createItemWindow']=function(){const _0x226bf5=_0xfbd732;VisuMZ['SkillsStatesCore']['Scene_Skill_createItemWindow'][_0x226bf5(0x188)](this),this[_0x226bf5(0x1e6)]()&&this[_0x226bf5(0x1f9)]();},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x316)]=Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x375)],Scene_Skill['prototype'][_0xfbd732(0x375)]=function(){const _0x53782b=_0xfbd732;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x53782b(0x37a)]();else{const _0x31d28d=VisuMZ[_0x53782b(0x377)][_0x53782b(0x316)][_0x53782b(0x188)](this);return this[_0x53782b(0x1e6)]()&&this[_0x53782b(0x1f8)]()&&(_0x31d28d[_0x53782b(0x18b)]-=this[_0x53782b(0x170)]()),_0x31d28d;}},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x37a)]=function(){const _0xb510e7=_0xfbd732,_0x5b5bc=Graphics['boxWidth']-this['shopStatusWidth'](),_0xd8e9b2=this[_0xb510e7(0x216)]()-this[_0xb510e7(0x1a5)][_0xb510e7(0x1e5)],_0x6d0c23=this[_0xb510e7(0x33a)]()?Graphics[_0xb510e7(0x18f)]-_0x5b5bc:0x0,_0x62be78=this[_0xb510e7(0x1a5)]['y']+this[_0xb510e7(0x1a5)]['height'];return new Rectangle(_0x6d0c23,_0x62be78,_0x5b5bc,_0xd8e9b2);},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x1e6)]=function(){const _0x6074e6=_0xfbd732;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else return this[_0x6074e6(0x26f)]()?!![]:VisuMZ[_0x6074e6(0x377)][_0x6074e6(0x1ee)][_0x6074e6(0x234)][_0x6074e6(0x1ad)];},Scene_Skill[_0xfbd732(0x248)]['adjustItemWidthByShopStatus']=function(){const _0x3ab46e=_0xfbd732;return VisuMZ[_0x3ab46e(0x377)]['Settings']['Skills']['SkillSceneAdjustSkillList'];},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x1f9)]=function(){const _0x401ae1=_0xfbd732,_0x538fd1=this[_0x401ae1(0x39d)]();this[_0x401ae1(0x296)]=new Window_ShopStatus(_0x538fd1),this[_0x401ae1(0x1d0)](this['_shopStatusWindow']),this[_0x401ae1(0x198)][_0x401ae1(0x1f2)](this[_0x401ae1(0x296)]);const _0x51f98b=VisuMZ[_0x401ae1(0x377)][_0x401ae1(0x1ee)][_0x401ae1(0x234)][_0x401ae1(0x276)];this[_0x401ae1(0x296)][_0x401ae1(0x233)](_0x51f98b||0x0);},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x39d)]=function(){const _0x9c35f9=_0xfbd732;return this[_0x9c35f9(0x26f)]()?this['shopStatusWindowRectSkillsStatesCore']():VisuMZ[_0x9c35f9(0x377)]['Settings']['Skills'][_0x9c35f9(0x2ce)][_0x9c35f9(0x188)](this);},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x31f)]=function(){const _0x1990af=_0xfbd732,_0x620c25=this[_0x1990af(0x170)](),_0x577314=this['_itemWindow'][_0x1990af(0x1e5)],_0x167b42=this[_0x1990af(0x33a)]()?0x0:Graphics[_0x1990af(0x18f)]-this[_0x1990af(0x170)](),_0x31fbbd=this['_itemWindow']['y'];return new Rectangle(_0x167b42,_0x31fbbd,_0x620c25,_0x577314);},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x170)]=function(){const _0x254816=_0xfbd732;return Imported[_0x254816(0x16a)]?Scene_Shop[_0x254816(0x248)][_0x254816(0x24c)]():0x0;},Scene_Skill[_0xfbd732(0x248)][_0xfbd732(0x1f6)]=function(){const _0x2b8206=_0xfbd732;return this[_0x2b8206(0x231)]&&this[_0x2b8206(0x231)][_0x2b8206(0x3a3)]?TextManager['buttonAssistSwitch']:'';},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x309)]=Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x2e8)],Sprite_Gauge['prototype'][_0xfbd732(0x2e8)]=function(){const _0x2357e0=_0xfbd732;VisuMZ[_0x2357e0(0x377)][_0x2357e0(0x309)][_0x2357e0(0x188)](this),this['_costSettings']=null;},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x376)]=Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x23d)],Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x23d)]=function(_0x38f646,_0x23106a){const _0x1a43ab=_0xfbd732;this[_0x1a43ab(0x1e2)](_0x38f646,_0x23106a),_0x23106a=_0x23106a['toLowerCase'](),VisuMZ[_0x1a43ab(0x377)][_0x1a43ab(0x376)][_0x1a43ab(0x188)](this,_0x38f646,_0x23106a);},Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x1e2)]=function(_0x5b7f15,_0x5baf6d){const _0x45e560=_0xfbd732,_0x5c95e1=VisuMZ['SkillsStatesCore'][_0x45e560(0x1ee)][_0x45e560(0x2ac)]['filter'](_0x445ed1=>_0x445ed1[_0x45e560(0x395)][_0x45e560(0x390)]()===_0x5baf6d['toUpperCase']());_0x5c95e1[_0x45e560(0x241)]>=0x1?this[_0x45e560(0x284)]=_0x5c95e1[0x0]:this[_0x45e560(0x284)]=null;},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x2fc)]=Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x1be)],Sprite_Gauge['prototype'][_0xfbd732(0x1be)]=function(){const _0x50940a=_0xfbd732;return this[_0x50940a(0x174)]&&this['_costSettings']?this[_0x50940a(0x1da)]():VisuMZ[_0x50940a(0x377)][_0x50940a(0x2fc)][_0x50940a(0x188)](this);},Sprite_Gauge[_0xfbd732(0x248)]['currentValueSkillsStatesCore']=function(){const _0x590f3b=_0xfbd732;return this[_0x590f3b(0x284)][_0x590f3b(0x22e)]['call'](this[_0x590f3b(0x174)]);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x353)]=Sprite_Gauge[_0xfbd732(0x248)]['currentMaxValue'],Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x2be)]=function(){const _0x329a17=_0xfbd732;return this[_0x329a17(0x174)]&&this['_costSettings']?this[_0x329a17(0x35e)]():VisuMZ[_0x329a17(0x377)][_0x329a17(0x353)][_0x329a17(0x188)](this);},Sprite_Gauge['prototype'][_0xfbd732(0x35e)]=function(){const _0x2180bf=_0xfbd732;return this['_costSettings']['GaugeMaxJS'][_0x2180bf(0x188)](this[_0x2180bf(0x174)]);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x38a)]=Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x1b9)],Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x1b9)]=function(){const _0x271376=_0xfbd732,_0x19422d=VisuMZ['SkillsStatesCore'][_0x271376(0x38a)][_0x271376(0x188)](this);return _0x19422d[_0x271376(0x283)](0x0,0x1);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1b8)]=Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x23e)],Sprite_Gauge['prototype'][_0xfbd732(0x23e)]=function(){const _0x53eb15=_0xfbd732;this[_0x53eb15(0x174)]&&this[_0x53eb15(0x284)]?(this[_0x53eb15(0x294)][_0x53eb15(0x383)](),this[_0x53eb15(0x177)]()):VisuMZ[_0x53eb15(0x377)][_0x53eb15(0x1b8)][_0x53eb15(0x188)](this);},Sprite_Gauge['prototype'][_0xfbd732(0x310)]=function(){const _0x29dc09=_0xfbd732;let _0x3468ce=this[_0x29dc09(0x1be)]();return Imported[_0x29dc09(0x315)]&&this[_0x29dc09(0x21e)]()&&(_0x3468ce=VisuMZ[_0x29dc09(0x38b)](_0x3468ce)),_0x3468ce;},Sprite_Gauge[_0xfbd732(0x248)]['redrawSkillsStatesCore']=function(){const _0x5c0ab8=_0xfbd732;this[_0x5c0ab8(0x284)][_0x5c0ab8(0x359)][_0x5c0ab8(0x188)](this);},Sprite_Gauge[_0xfbd732(0x248)][_0xfbd732(0x209)]=function(_0x134cd6,_0x505660,_0x3b31fa,_0x3a700d,_0x5b6d3a,_0x1882a9){const _0x5622de=_0xfbd732,_0x4f186b=this[_0x5622de(0x1b9)](),_0x5df378=Math[_0x5622de(0x29b)]((_0x5b6d3a-0x2)*_0x4f186b),_0x588bdd=_0x1882a9-0x2,_0x582822=this['gaugeBackColor']();this['bitmap']['fillRect'](_0x3b31fa,_0x3a700d,_0x5b6d3a,_0x1882a9,_0x582822),this[_0x5622de(0x294)][_0x5622de(0x3a0)](_0x3b31fa+0x1,_0x3a700d+0x1,_0x5df378,_0x588bdd,_0x134cd6,_0x505660);},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon['prototype']['loadBitmap'],Sprite_StateIcon[_0xfbd732(0x248)][_0xfbd732(0x199)]=function(){const _0x4d6d26=_0xfbd732;VisuMZ[_0x4d6d26(0x377)][_0x4d6d26(0x2d6)]['call'](this),this['createTurnDisplaySprite']();},Sprite_StateIcon['prototype'][_0xfbd732(0x2d1)]=function(){const _0x2f9c72=_0xfbd732,_0x2e8f4c=Window_Base[_0x2f9c72(0x248)][_0x2f9c72(0x1fc)]();this[_0x2f9c72(0x313)]=new Sprite(),this[_0x2f9c72(0x313)][_0x2f9c72(0x294)]=new Bitmap(ImageManager[_0x2f9c72(0x208)],_0x2e8f4c),this[_0x2f9c72(0x313)][_0x2f9c72(0x35f)]['x']=this['anchor']['x'],this[_0x2f9c72(0x313)][_0x2f9c72(0x35f)]['y']=this[_0x2f9c72(0x35f)]['y'],this[_0x2f9c72(0x2cd)](this[_0x2f9c72(0x313)]),this[_0x2f9c72(0x354)]=this['_turnDisplaySprite'][_0x2f9c72(0x294)];},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x1e4)]=Sprite_StateIcon[_0xfbd732(0x248)][_0xfbd732(0x2e5)],Sprite_StateIcon[_0xfbd732(0x248)][_0xfbd732(0x2e5)]=function(){const _0x31c6ea=_0xfbd732;VisuMZ['SkillsStatesCore'][_0x31c6ea(0x1e4)]['call'](this),this[_0x31c6ea(0x349)]();},Sprite_StateIcon[_0xfbd732(0x248)][_0xfbd732(0x22b)]=function(_0x3c105b,_0x14b7db,_0x222a63,_0x69bb86,_0x183b47){const _0x299085=_0xfbd732;this[_0x299085(0x354)][_0x299085(0x22b)](_0x3c105b,_0x14b7db,_0x222a63,_0x69bb86,this[_0x299085(0x354)][_0x299085(0x1e5)],_0x183b47);},Sprite_StateIcon[_0xfbd732(0x248)][_0xfbd732(0x349)]=function(){const _0x7c4ea1=_0xfbd732;this[_0x7c4ea1(0x1d2)](),this[_0x7c4ea1(0x354)][_0x7c4ea1(0x383)]();const _0x3f40c8=this[_0x7c4ea1(0x174)];if(!_0x3f40c8)return;const _0x3d0f73=_0x3f40c8['states']()['filter'](_0x221122=>_0x221122[_0x7c4ea1(0x220)]>0x0),_0x207ca3=[...Array(0x8)['keys']()][_0x7c4ea1(0x243)](_0x3efd1f=>_0x3f40c8[_0x7c4ea1(0x1cf)](_0x3efd1f)!==0x0),_0x1c308f=this['_animationIndex'],_0xc54eb9=_0x3d0f73[_0x1c308f];if(_0xc54eb9)Window_Base['prototype']['drawActorStateTurns'][_0x7c4ea1(0x188)](this,_0x3f40c8,_0xc54eb9,0x0,0x0),Window_Base[_0x7c4ea1(0x248)]['drawActorStateData'][_0x7c4ea1(0x188)](this,_0x3f40c8,_0xc54eb9,0x0,0x0);else{const _0x58b6b6=_0x207ca3[_0x1c308f-_0x3d0f73[_0x7c4ea1(0x241)]];if(_0x58b6b6===undefined)return;Window_Base[_0x7c4ea1(0x248)][_0x7c4ea1(0x299)]['call'](this,_0x3f40c8,_0x58b6b6,0x0,0x0),Window_Base[_0x7c4ea1(0x248)]['drawActorBuffRates'][_0x7c4ea1(0x188)](this,_0x3f40c8,_0x58b6b6,0x0,0x0);}},Sprite_StateIcon['prototype']['resetFontSettings']=function(){const _0x26ca58=_0xfbd732;this[_0x26ca58(0x354)][_0x26ca58(0x2ef)]=$gameSystem[_0x26ca58(0x398)](),this[_0x26ca58(0x354)][_0x26ca58(0x1bc)]=$gameSystem[_0x26ca58(0x206)](),this[_0x26ca58(0x1bb)]();},Sprite_StateIcon[_0xfbd732(0x248)][_0xfbd732(0x1bb)]=function(){const _0x4b084b=_0xfbd732;this[_0x4b084b(0x36f)](ColorManager[_0x4b084b(0x1cb)]()),this[_0x4b084b(0x271)](ColorManager['outlineColor']());},Sprite_StateIcon['prototype'][_0xfbd732(0x36f)]=function(_0x5c8db1){this['contents']['textColor']=_0x5c8db1;},Sprite_StateIcon[_0xfbd732(0x248)][_0xfbd732(0x271)]=function(_0x43e160){const _0x4c8bf9=_0xfbd732;this['contents'][_0x4c8bf9(0x2d3)]=_0x43e160;},Sprite_StateIcon[_0xfbd732(0x248)][_0xfbd732(0x36c)]=function(){const _0x17240b=_0xfbd732;this[_0x17240b(0x2a4)]=!![],this['updateVisibility']();},Window_Base[_0xfbd732(0x248)][_0xfbd732(0x2a5)]=function(_0x338719,_0x32b784,_0x511b20,_0xba0491,_0x57379a){const _0x4a429b=_0xfbd732,_0xfdb47a=this[_0x4a429b(0x262)](_0x338719,_0x32b784),_0x1c5f2c=this[_0x4a429b(0x301)](_0xfdb47a,_0x511b20,_0xba0491,_0x57379a),_0x1c5b1a=_0x511b20+_0x57379a-_0x1c5f2c[_0x4a429b(0x18b)];this[_0x4a429b(0x212)](_0xfdb47a,_0x1c5b1a,_0xba0491,_0x57379a),this['resetFontSettings']();},Window_Base[_0xfbd732(0x248)]['createAllSkillCostText']=function(_0x346697,_0x5e369e){const _0x3f4acd=_0xfbd732;let _0x1a5fc1='';for(settings of VisuMZ[_0x3f4acd(0x377)][_0x3f4acd(0x1ee)][_0x3f4acd(0x2ac)]){if(!this[_0x3f4acd(0x2fa)](_0x346697,_0x5e369e,settings))continue;if(_0x1a5fc1[_0x3f4acd(0x241)]>0x0)_0x1a5fc1+=this[_0x3f4acd(0x166)]();_0x1a5fc1+=this['createSkillCostText'](_0x346697,_0x5e369e,settings);}_0x1a5fc1=this[_0x3f4acd(0x20d)](_0x346697,_0x5e369e,_0x1a5fc1);if(_0x5e369e[_0x3f4acd(0x1d4)][_0x3f4acd(0x1c9)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x1a5fc1['length']>0x0)_0x1a5fc1+=this[_0x3f4acd(0x166)]();_0x1a5fc1+=String(RegExp['$1']);}return _0x1a5fc1;},Window_Base[_0xfbd732(0x248)][_0xfbd732(0x20d)]=function(_0x3d37ad,_0x35800e,_0x17fe95){return _0x17fe95;},Window_Base[_0xfbd732(0x248)][_0xfbd732(0x2fa)]=function(_0x8000c0,_0x1b257f,_0x435485){const _0xda5fa=_0xfbd732,_0x38e5ab=_0x435485[_0xda5fa(0x362)][_0xda5fa(0x188)](_0x8000c0,_0x1b257f);return _0x435485[_0xda5fa(0x387)]['call'](_0x8000c0,_0x1b257f,_0x38e5ab,_0x435485);},Window_Base[_0xfbd732(0x248)][_0xfbd732(0x1d7)]=function(_0x171704,_0x2cd910,_0x537418){const _0x4823df=_0xfbd732,_0x35e079=_0x537418[_0x4823df(0x362)]['call'](_0x171704,_0x2cd910);return _0x537418['TextJS']['call'](_0x171704,_0x2cd910,_0x35e079,_0x537418);},Window_Base[_0xfbd732(0x248)][_0xfbd732(0x166)]=function(){return'\x20';},Window_Base[_0xfbd732(0x248)][_0xfbd732(0x31c)]=function(_0x1118ed,_0x342f9a,_0x20306b,_0x5e7919){const _0x51646a=_0xfbd732;if(!_0x1118ed)return;VisuMZ[_0x51646a(0x377)]['Window_StatusBase_drawActorIcons'][_0x51646a(0x188)](this,_0x1118ed,_0x342f9a,_0x20306b,_0x5e7919),this[_0x51646a(0x2eb)](_0x1118ed,_0x342f9a,_0x20306b,_0x5e7919);},Window_Base['prototype'][_0xfbd732(0x2eb)]=function(_0x546b9f,_0x4ff7e3,_0x1a4db4,_0x1ce8a5){const _0x53d25e=_0xfbd732;_0x1ce8a5=_0x1ce8a5||0x90;const _0x48c038=ImageManager['iconWidth'],_0x1a6682=_0x546b9f[_0x53d25e(0x304)]()['slice'](0x0,Math[_0x53d25e(0x29b)](_0x1ce8a5/_0x48c038)),_0x492804=_0x546b9f[_0x53d25e(0x2a7)]()[_0x53d25e(0x243)](_0x391165=>_0x391165[_0x53d25e(0x220)]>0x0),_0x73adfb=[...Array(0x8)[_0x53d25e(0x331)]()][_0x53d25e(0x243)](_0x1f4e0a=>_0x546b9f['buff'](_0x1f4e0a)!==0x0),_0x4173ac=[];let _0x4e7e95=_0x4ff7e3;for(let _0x3887a9=0x0;_0x3887a9<_0x1a6682[_0x53d25e(0x241)];_0x3887a9++){this[_0x53d25e(0x1d2)]();const _0x25ba04=_0x492804[_0x3887a9];if(_0x25ba04)!_0x4173ac['includes'](_0x25ba04)&&this[_0x53d25e(0x2db)](_0x546b9f,_0x25ba04,_0x4e7e95,_0x1a4db4),this[_0x53d25e(0x287)](_0x546b9f,_0x25ba04,_0x4e7e95,_0x1a4db4),_0x4173ac[_0x53d25e(0x196)](_0x25ba04);else{const _0x30ea38=_0x73adfb[_0x3887a9-_0x492804[_0x53d25e(0x241)]];this['drawActorBuffTurns'](_0x546b9f,_0x30ea38,_0x4e7e95,_0x1a4db4),this[_0x53d25e(0x39b)](_0x546b9f,_0x30ea38,_0x4e7e95,_0x1a4db4);}_0x4e7e95+=_0x48c038;}},Window_Base[_0xfbd732(0x248)]['drawActorStateTurns']=function(_0x3f24f6,_0x554a80,_0x4fa23b,_0x2673d1){const _0x4b837d=_0xfbd732;if(!VisuMZ['SkillsStatesCore'][_0x4b837d(0x1ee)][_0x4b837d(0x264)][_0x4b837d(0x32c)])return;if(!_0x3f24f6['isStateAffected'](_0x554a80['id']))return;if(_0x554a80[_0x4b837d(0x2b6)]===0x0)return;if(_0x554a80[_0x4b837d(0x1d4)]['match'](/<HIDE STATE TURNS>/i))return;const _0x40a8dc=_0x3f24f6['stateTurns'](_0x554a80['id']),_0x11c748=ImageManager[_0x4b837d(0x208)],_0x32dbc6=ColorManager[_0x4b837d(0x28d)](_0x554a80);this['changeTextColor'](_0x32dbc6),this['changeOutlineColor'](_0x4b837d(0x3a6)),this[_0x4b837d(0x354)]['fontBold']=!![],this[_0x4b837d(0x354)][_0x4b837d(0x1bc)]=VisuMZ[_0x4b837d(0x377)][_0x4b837d(0x1ee)]['States'][_0x4b837d(0x2c4)],_0x4fa23b+=VisuMZ[_0x4b837d(0x377)][_0x4b837d(0x1ee)][_0x4b837d(0x264)][_0x4b837d(0x311)],_0x2673d1+=VisuMZ[_0x4b837d(0x377)][_0x4b837d(0x1ee)][_0x4b837d(0x264)][_0x4b837d(0x34a)],this[_0x4b837d(0x22b)](_0x40a8dc,_0x4fa23b,_0x2673d1,_0x11c748,_0x4b837d(0x1d9)),this[_0x4b837d(0x354)][_0x4b837d(0x238)]=![],this[_0x4b837d(0x1d2)]();},Window_Base['prototype'][_0xfbd732(0x287)]=function(_0x2e5655,_0x3ddbc9,_0xa5d6e8,_0x86b55c){const _0x48e086=_0xfbd732;if(!VisuMZ['SkillsStatesCore'][_0x48e086(0x1ee)]['States'][_0x48e086(0x2a8)])return;const _0xaec71e=ImageManager[_0x48e086(0x208)],_0xd4c397=ImageManager['iconHeight']/0x2,_0x3618ed=ColorManager[_0x48e086(0x1cb)]();this[_0x48e086(0x36f)](_0x3618ed),this['changeOutlineColor'](_0x48e086(0x3a6)),this[_0x48e086(0x354)][_0x48e086(0x238)]=!![],this[_0x48e086(0x354)]['fontSize']=VisuMZ[_0x48e086(0x377)][_0x48e086(0x1ee)][_0x48e086(0x264)]['DataFontSize'],_0xa5d6e8+=VisuMZ[_0x48e086(0x377)]['Settings']['States'][_0x48e086(0x1a6)],_0x86b55c+=VisuMZ[_0x48e086(0x377)][_0x48e086(0x1ee)][_0x48e086(0x264)][_0x48e086(0x230)];const _0x19d055=String(_0x2e5655[_0x48e086(0x338)](_0x3ddbc9['id']));this[_0x48e086(0x22b)](_0x19d055,_0xa5d6e8,_0x86b55c,_0xaec71e,'center'),this['contents'][_0x48e086(0x238)]=![],this[_0x48e086(0x1d2)]();},Window_Base[_0xfbd732(0x248)][_0xfbd732(0x299)]=function(_0x389d53,_0x43eb77,_0x31a5a4,_0x50b730){const _0x13ce91=_0xfbd732;if(!VisuMZ['SkillsStatesCore']['Settings'][_0x13ce91(0x189)][_0x13ce91(0x32c)])return;const _0x45173e=_0x389d53[_0x13ce91(0x1cf)](_0x43eb77);if(_0x45173e===0x0)return;const _0xd03ec2=_0x389d53[_0x13ce91(0x270)](_0x43eb77),_0x867975=ImageManager[_0x13ce91(0x208)],_0x1042a4=_0x45173e>0x0?ColorManager[_0x13ce91(0x2c3)]():ColorManager[_0x13ce91(0x229)]();this[_0x13ce91(0x36f)](_0x1042a4),this[_0x13ce91(0x271)](_0x13ce91(0x3a6)),this[_0x13ce91(0x354)][_0x13ce91(0x238)]=!![],this['contents']['fontSize']=VisuMZ[_0x13ce91(0x377)][_0x13ce91(0x1ee)][_0x13ce91(0x189)][_0x13ce91(0x2c4)],_0x31a5a4+=VisuMZ[_0x13ce91(0x377)][_0x13ce91(0x1ee)][_0x13ce91(0x189)][_0x13ce91(0x311)],_0x50b730+=VisuMZ['SkillsStatesCore'][_0x13ce91(0x1ee)][_0x13ce91(0x189)][_0x13ce91(0x34a)],this[_0x13ce91(0x22b)](_0xd03ec2,_0x31a5a4,_0x50b730,_0x867975,_0x13ce91(0x1d9)),this[_0x13ce91(0x354)][_0x13ce91(0x238)]=![],this[_0x13ce91(0x1d2)]();},Window_Base[_0xfbd732(0x248)][_0xfbd732(0x39b)]=function(_0x2a2c5c,_0x42594d,_0x521879,_0x4daa9f){const _0x4ec4cf=_0xfbd732;if(!VisuMZ['SkillsStatesCore'][_0x4ec4cf(0x1ee)]['Buffs'][_0x4ec4cf(0x2a8)])return;const _0x235eb9=_0x2a2c5c[_0x4ec4cf(0x326)](_0x42594d),_0x53ab5e=_0x2a2c5c[_0x4ec4cf(0x1cf)](_0x42594d),_0x532268=ImageManager[_0x4ec4cf(0x208)],_0x9d90d2=ImageManager[_0x4ec4cf(0x286)]/0x2,_0xf357be=_0x53ab5e>0x0?ColorManager[_0x4ec4cf(0x2c3)]():ColorManager[_0x4ec4cf(0x229)]();this[_0x4ec4cf(0x36f)](_0xf357be),this[_0x4ec4cf(0x271)](_0x4ec4cf(0x3a6)),this[_0x4ec4cf(0x354)]['fontBold']=!![],this[_0x4ec4cf(0x354)][_0x4ec4cf(0x1bc)]=VisuMZ['SkillsStatesCore'][_0x4ec4cf(0x1ee)]['Buffs']['DataFontSize'],_0x521879+=VisuMZ['SkillsStatesCore'][_0x4ec4cf(0x1ee)][_0x4ec4cf(0x189)][_0x4ec4cf(0x1a6)],_0x4daa9f+=VisuMZ[_0x4ec4cf(0x377)][_0x4ec4cf(0x1ee)][_0x4ec4cf(0x189)][_0x4ec4cf(0x230)];const _0x48adb5=_0x4ec4cf(0x344)[_0x4ec4cf(0x336)](Math['round'](_0x235eb9*0x64));this[_0x4ec4cf(0x22b)](_0x48adb5,_0x521879,_0x4daa9f,_0x532268,'center'),this[_0x4ec4cf(0x354)][_0x4ec4cf(0x238)]=![],this['resetFontSettings']();},VisuMZ['SkillsStatesCore'][_0xfbd732(0x26e)]=Window_StatusBase[_0xfbd732(0x248)][_0xfbd732(0x382)],Window_StatusBase[_0xfbd732(0x248)][_0xfbd732(0x382)]=function(_0x58e421,_0x3b32b7,_0x97b303,_0x596486){const _0x24b275=_0xfbd732;if(_0x58e421[_0x24b275(0x1af)]())_0x3b32b7=this[_0x24b275(0x268)](_0x58e421,_0x3b32b7);this[_0x24b275(0x314)](_0x58e421,_0x3b32b7,_0x97b303,_0x596486);},Window_StatusBase[_0xfbd732(0x248)]['placeExactGauge']=function(_0x2087ba,_0x595be9,_0x34d8d3,_0x261e1e){const _0x541997=_0xfbd732;if([_0x541997(0x27a),_0x541997(0x346)]['includes'](_0x595be9[_0x541997(0x1ff)]()))return;VisuMZ[_0x541997(0x377)][_0x541997(0x26e)][_0x541997(0x188)](this,_0x2087ba,_0x595be9,_0x34d8d3,_0x261e1e);},Window_StatusBase['prototype']['convertGaugeTypeSkillsStatesCore']=function(_0x27bd56,_0x11ab0e){const _0x44bcae=_0xfbd732,_0x155d5f=_0x27bd56[_0x44bcae(0x381)]()[_0x44bcae(0x1d4)];if(_0x11ab0e==='hp'&&_0x155d5f[_0x44bcae(0x1c9)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x11ab0e==='mp'&&_0x155d5f[_0x44bcae(0x1c9)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x11ab0e==='tp'&&_0x155d5f[_0x44bcae(0x1c9)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x11ab0e;}},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x227)]=Window_StatusBase[_0xfbd732(0x248)][_0xfbd732(0x31c)],Window_StatusBase[_0xfbd732(0x248)][_0xfbd732(0x31c)]=function(_0xdb805c,_0x3a2618,_0x1bd192,_0x566c1d){const _0x1e4d6b=_0xfbd732;if(!_0xdb805c)return;Window_Base[_0x1e4d6b(0x248)]['drawActorIcons'][_0x1e4d6b(0x188)](this,_0xdb805c,_0x3a2618,_0x1bd192,_0x566c1d);},VisuMZ[_0xfbd732(0x377)]['Window_SkillType_initialize']=Window_SkillType['prototype'][_0xfbd732(0x298)],Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x298)]=function(_0x3dcc66){const _0x31c717=_0xfbd732;VisuMZ[_0x31c717(0x377)][_0x31c717(0x1b4)]['call'](this,_0x3dcc66),this[_0x31c717(0x1f0)](_0x3dcc66);},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x1f0)]=function(_0x5ad5fd){const _0x56758c=_0xfbd732,_0xd25a82=new Rectangle(0x0,0x0,_0x5ad5fd[_0x56758c(0x18b)],_0x5ad5fd['height']);this[_0x56758c(0x172)]=new Window_Base(_0xd25a82),this[_0x56758c(0x172)]['opacity']=0x0,this[_0x56758c(0x2cd)](this[_0x56758c(0x172)]),this[_0x56758c(0x35b)]();},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x2cc)]=function(){const _0x4f7606=_0xfbd732;Window_Command[_0x4f7606(0x248)][_0x4f7606(0x2cc)][_0x4f7606(0x188)](this);if(this[_0x4f7606(0x172)])this[_0x4f7606(0x35b)]();},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x35b)]=function(){const _0x570fd7=_0xfbd732,_0x4e9136=this[_0x570fd7(0x172)];_0x4e9136[_0x570fd7(0x354)]['clear']();const _0x4888e2=this['commandStyleCheck'](this[_0x570fd7(0x3a7)]());if(_0x4888e2==='icon'&&this['maxItems']()>0x0){const _0x9dd227=this[_0x570fd7(0x19b)](this[_0x570fd7(0x3a7)]());let _0x4d0beb=this['commandName'](this[_0x570fd7(0x3a7)]());_0x4d0beb=_0x4d0beb[_0x570fd7(0x2d0)](/\\I\[(\d+)\]/gi,''),_0x4e9136[_0x570fd7(0x1d2)](),this[_0x570fd7(0x2a2)](_0x4d0beb,_0x9dd227),this[_0x570fd7(0x2f2)](_0x4d0beb,_0x9dd227),this[_0x570fd7(0x378)](_0x4d0beb,_0x9dd227);}},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x2a2)]=function(_0x78e193,_0x53fb5c){},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x2f2)]=function(_0x3afca8,_0x3fcf4f){const _0x1d1014=_0xfbd732,_0x4454b7=this['_commandNameWindow'];_0x4454b7['drawText'](_0x3afca8,0x0,_0x3fcf4f['y'],_0x4454b7[_0x1d1014(0x38e)],_0x1d1014(0x2f1));},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x378)]=function(_0x38fcb6,_0x49da58){const _0x419db3=_0xfbd732,_0x12761a=this[_0x419db3(0x172)],_0x6a71f7=$gameSystem[_0x419db3(0x1d6)](),_0x3162cb=_0x49da58['x']+Math[_0x419db3(0x29b)](_0x49da58['width']/0x2)+_0x6a71f7;_0x12761a['x']=_0x12761a['width']/-0x2+_0x3162cb,_0x12761a['y']=Math[_0x419db3(0x29b)](_0x49da58['height']/0x2);},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x1ef)]=function(){const _0x572d1d=_0xfbd732;return Imported[_0x572d1d(0x315)]&&Window_Command[_0x572d1d(0x248)][_0x572d1d(0x1ef)][_0x572d1d(0x188)](this);},Window_SkillType['prototype'][_0xfbd732(0x17f)]=function(){const _0x2b1f63=_0xfbd732;if(!this[_0x2b1f63(0x393)])return;const _0x76a4a8=this[_0x2b1f63(0x393)][_0x2b1f63(0x3aa)]();for(const _0x28db88 of _0x76a4a8){const _0x33827f=this[_0x2b1f63(0x21f)](_0x28db88);this['addCommand'](_0x33827f,_0x2b1f63(0x3a9),!![],_0x28db88);}},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x21f)]=function(_0x123efe){const _0xcf3f76=_0xfbd732;let _0x558f64=$dataSystem[_0xcf3f76(0x3aa)][_0x123efe];if(_0x558f64['match'](/\\I\[(\d+)\]/i))return _0x558f64;if(this['commandStyle']()===_0xcf3f76(0x2d7))return _0x558f64;const _0x527f84=VisuMZ[_0xcf3f76(0x377)][_0xcf3f76(0x1ee)][_0xcf3f76(0x234)],_0xd905d9=$dataSystem['magicSkills'][_0xcf3f76(0x32e)](_0x123efe),_0x1ee2a0=_0xd905d9?_0x527f84[_0xcf3f76(0x18d)]:_0x527f84[_0xcf3f76(0x293)];return _0xcf3f76(0x242)[_0xcf3f76(0x336)](_0x1ee2a0,_0x558f64);},Window_SkillType[_0xfbd732(0x248)]['itemTextAlign']=function(){const _0x2e5e80=_0xfbd732;return VisuMZ[_0x2e5e80(0x377)]['Settings']['Skills'][_0x2e5e80(0x16d)];},Window_SkillType['prototype'][_0xfbd732(0x15f)]=function(_0x456939){const _0x3c3c57=_0xfbd732,_0x2cc4aa=this[_0x3c3c57(0x269)](_0x456939);if(_0x2cc4aa===_0x3c3c57(0x17c))this[_0x3c3c57(0x3a8)](_0x456939);else _0x2cc4aa==='icon'?this[_0x3c3c57(0x24d)](_0x456939):Window_Command[_0x3c3c57(0x248)][_0x3c3c57(0x15f)]['call'](this,_0x456939);},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x30c)]=function(){const _0x1e908d=_0xfbd732;return VisuMZ[_0x1e908d(0x377)][_0x1e908d(0x1ee)][_0x1e908d(0x234)][_0x1e908d(0x19c)];},Window_SkillType['prototype'][_0xfbd732(0x269)]=function(_0x26d451){const _0x541880=_0xfbd732;if(_0x26d451<0x0)return _0x541880(0x2d7);const _0x1e50de=this['commandStyle']();if(_0x1e50de!==_0x541880(0x35c))return _0x1e50de;else{if(this[_0x541880(0x335)]()>0x0){const _0x2a477c=this['commandName'](_0x26d451);if(_0x2a477c[_0x541880(0x1c9)](/\\I\[(\d+)\]/i)){const _0x36e629=this['itemLineRect'](_0x26d451),_0x34fc07=this['textSizeEx'](_0x2a477c)[_0x541880(0x18b)];return _0x34fc07<=_0x36e629[_0x541880(0x18b)]?_0x541880(0x17c):_0x541880(0x1a7);}}}return'text';},Window_SkillType[_0xfbd732(0x248)][_0xfbd732(0x3a8)]=function(_0x31a2c2){const _0x479838=_0xfbd732,_0x1271c9=this[_0x479838(0x19b)](_0x31a2c2),_0x52b70b=this['commandName'](_0x31a2c2),_0x93adc6=this[_0x479838(0x301)](_0x52b70b)[_0x479838(0x18b)];this[_0x479838(0x2ae)](this[_0x479838(0x356)](_0x31a2c2));const _0x565eec=this['itemTextAlign']();if(_0x565eec==='right')this[_0x479838(0x212)](_0x52b70b,_0x1271c9['x']+_0x1271c9[_0x479838(0x18b)]-_0x93adc6,_0x1271c9['y'],_0x93adc6);else{if(_0x565eec===_0x479838(0x2f1)){const _0x55d8f0=_0x1271c9['x']+Math[_0x479838(0x29b)]((_0x1271c9[_0x479838(0x18b)]-_0x93adc6)/0x2);this[_0x479838(0x212)](_0x52b70b,_0x55d8f0,_0x1271c9['y'],_0x93adc6);}else this['drawTextEx'](_0x52b70b,_0x1271c9['x'],_0x1271c9['y'],_0x93adc6);}},Window_SkillType['prototype'][_0xfbd732(0x24d)]=function(_0x5b44ef){const _0x201e6d=_0xfbd732;this['commandName'](_0x5b44ef)['match'](/\\I\[(\d+)\]/i);const _0x53e6ab=Number(RegExp['$1'])||0x0,_0x3406f7=this[_0x201e6d(0x19b)](_0x5b44ef),_0x786fc8=_0x3406f7['x']+Math[_0x201e6d(0x29b)]((_0x3406f7[_0x201e6d(0x18b)]-ImageManager['iconWidth'])/0x2),_0x4b673a=_0x3406f7['y']+(_0x3406f7['height']-ImageManager[_0x201e6d(0x286)])/0x2;this[_0x201e6d(0x19e)](_0x53e6ab,_0x786fc8,_0x4b673a);},VisuMZ['SkillsStatesCore']['Window_SkillStatus_refresh']=Window_SkillStatus[_0xfbd732(0x248)][_0xfbd732(0x380)],Window_SkillStatus['prototype'][_0xfbd732(0x380)]=function(){const _0x35b0e2=_0xfbd732;VisuMZ['SkillsStatesCore']['Window_SkillStatus_refresh'][_0x35b0e2(0x188)](this);if(this[_0x35b0e2(0x393)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0xfbd732(0x248)][_0xfbd732(0x39c)]=function(){const _0x578ed1=_0xfbd732;if(!Imported[_0x578ed1(0x315)])return;if(!Imported[_0x578ed1(0x28c)])return;const _0xae3bfe=this[_0x578ed1(0x28b)]();let _0x5021d7=this[_0x578ed1(0x35d)]()/0x2+0xb4+0xb4+0xb4,_0x49493e=this[_0x578ed1(0x38e)]-_0x5021d7-0x2;if(_0x49493e>=0x12c){const _0x12d9e4=VisuMZ['CoreEngine'][_0x578ed1(0x1ee)][_0x578ed1(0x17e)][_0x578ed1(0x1c1)],_0x27e898=Math[_0x578ed1(0x29b)](_0x49493e/0x2)-0x18;let _0x2bbcd6=_0x5021d7,_0x1f387a=Math['floor']((this[_0x578ed1(0x1f1)]-Math[_0x578ed1(0x2f3)](_0x12d9e4['length']/0x2)*_0xae3bfe)/0x2),_0x13edd3=0x0;for(const _0x4befef of _0x12d9e4){this[_0x578ed1(0x163)](_0x2bbcd6,_0x1f387a,_0x27e898,_0x4befef),_0x13edd3++,_0x13edd3%0x2===0x0?(_0x2bbcd6=_0x5021d7,_0x1f387a+=_0xae3bfe):_0x2bbcd6+=_0x27e898+0x18;}}this[_0x578ed1(0x1d2)]();},Window_SkillStatus[_0xfbd732(0x248)][_0xfbd732(0x163)]=function(_0xbaf63e,_0x32b4e0,_0xf57b33,_0x26e2d8){const _0x398a62=_0xfbd732,_0x2303cd=this['gaugeLineHeight']();this[_0x398a62(0x1d2)](),this[_0x398a62(0x1df)](_0xbaf63e,_0x32b4e0,_0xf57b33,_0x26e2d8,!![]),this[_0x398a62(0x1bb)](),this['contents']['fontSize']-=0x8;const _0x40c97a=this[_0x398a62(0x393)][_0x398a62(0x28f)](_0x26e2d8,!![]);this[_0x398a62(0x354)][_0x398a62(0x22b)](_0x40c97a,_0xbaf63e,_0x32b4e0,_0xf57b33,_0x2303cd,_0x398a62(0x1d9));},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x256)]=Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x32e)],Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x32e)]=function(_0x45e13a){return this['includesSkillsStatesCore'](_0x45e13a);},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x30e)]=Window_SkillList['prototype'][_0xfbd732(0x288)],Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x288)]=function(){const _0x36e753=_0xfbd732;return SceneManager[_0x36e753(0x20a)][_0x36e753(0x1ce)]===Scene_Battle?VisuMZ[_0x36e753(0x377)][_0x36e753(0x30e)]['call'](this):VisuMZ[_0x36e753(0x377)]['Settings'][_0x36e753(0x234)][_0x36e753(0x275)];},VisuMZ[_0xfbd732(0x377)][_0xfbd732(0x26b)]=Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x1c3)],Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x1c3)]=function(_0x1770a7){const _0x12ba54=_0xfbd732,_0x168255=this['_actor']!==_0x1770a7;VisuMZ['SkillsStatesCore'][_0x12ba54(0x26b)][_0x12ba54(0x188)](this,_0x1770a7),_0x168255&&(this['_statusWindow']&&this['_statusWindow'][_0x12ba54(0x1ce)]===Window_ShopStatus&&this[_0x12ba54(0x1a5)][_0x12ba54(0x2bd)](this[_0x12ba54(0x373)](0x0)));},Window_SkillList['prototype'][_0xfbd732(0x2e0)]=function(_0x24524b){const _0x982a33=_0xfbd732;if(this[_0x982a33(0x319)]===_0x24524b)return;this['_stypeId']=_0x24524b,this[_0x982a33(0x380)](),this[_0x982a33(0x2a1)](0x0,0x0),this[_0x982a33(0x1a5)]&&this[_0x982a33(0x1a5)][_0x982a33(0x1ce)]===Window_ShopStatus&&this[_0x982a33(0x1a5)][_0x982a33(0x2bd)](this[_0x982a33(0x373)](0x0));},Window_SkillList['prototype'][_0xfbd732(0x32b)]=function(_0xa54f01){const _0x54265f=_0xfbd732;if(!_0xa54f01)return VisuMZ[_0x54265f(0x377)][_0x54265f(0x256)][_0x54265f(0x188)](this,_0xa54f01);if(!this[_0x54265f(0x1bd)](_0xa54f01))return![];if(!this[_0x54265f(0x217)](_0xa54f01))return![];if(!this[_0x54265f(0x37c)](_0xa54f01))return![];return!![];},Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x1bd)]=function(_0x44b23a){const _0x3d01d2=_0xfbd732;return DataManager['getSkillTypes'](_0x44b23a)[_0x3d01d2(0x32e)](this['_stypeId']);},Window_SkillList['prototype'][_0xfbd732(0x217)]=function(_0x3229eb){const _0x47696b=_0xfbd732;if(!this[_0x47696b(0x190)](_0x3229eb))return![];if(!this['checkShowHideSwitchNotetags'](_0x3229eb))return![];if(!this['checkShowHideSkillNotetags'](_0x3229eb))return![];return!![];},Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x190)]=function(_0x5db09a){const _0x411725=_0xfbd732,_0x1a718a=_0x5db09a[_0x411725(0x1d4)];if(_0x1a718a[_0x411725(0x1c9)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x411725(0x249)]())return![];else return _0x1a718a['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?![]:!![];},Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x1de)]=function(_0x1c2b76){const _0x5dc422=_0xfbd732,_0x228e5c=_0x1c2b76[_0x5dc422(0x1d4)];if(_0x228e5c[_0x5dc422(0x1c9)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x292e41=JSON[_0x5dc422(0x263)]('['+RegExp['$1'][_0x5dc422(0x1c9)](/\d+/g)+']');for(const _0x183f48 of _0x292e41){if(!$gameSwitches[_0x5dc422(0x160)](_0x183f48))return![];}return!![];}if(_0x228e5c['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x431f7d=JSON[_0x5dc422(0x263)]('['+RegExp['$1'][_0x5dc422(0x1c9)](/\d+/g)+']');for(const _0x33f34d of _0x431f7d){if(!$gameSwitches[_0x5dc422(0x160)](_0x33f34d))return![];}return!![];}if(_0x228e5c['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4973ee=JSON[_0x5dc422(0x263)]('['+RegExp['$1'][_0x5dc422(0x1c9)](/\d+/g)+']');for(const _0x4c0f4f of _0x4973ee){if($gameSwitches[_0x5dc422(0x160)](_0x4c0f4f))return!![];}return![];}if(_0x228e5c['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x195e3d=JSON[_0x5dc422(0x263)]('['+RegExp['$1'][_0x5dc422(0x1c9)](/\d+/g)+']');for(const _0x1cdc9a of _0x195e3d){if(!$gameSwitches['value'](_0x1cdc9a))return!![];}return![];}if(_0x228e5c[_0x5dc422(0x1c9)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a6789=JSON[_0x5dc422(0x263)]('['+RegExp['$1'][_0x5dc422(0x1c9)](/\d+/g)+']');for(const _0x460575 of _0x5a6789){if(!$gameSwitches[_0x5dc422(0x160)](_0x460575))return!![];}return![];}if(_0x228e5c[_0x5dc422(0x1c9)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x193082=JSON[_0x5dc422(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x506928 of _0x193082){if($gameSwitches[_0x5dc422(0x160)](_0x506928))return![];}return!![];}return!![];},Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x290)]=function(_0x1d760c){const _0x107352=_0xfbd732,_0x7a4b8d=_0x1d760c[_0x107352(0x1d4)];if(_0x7a4b8d[_0x107352(0x1c9)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4352c4=JSON[_0x107352(0x263)]('['+RegExp['$1'][_0x107352(0x1c9)](/\d+/g)+']');for(const _0x378aa8 of _0x4352c4){if(!this[_0x107352(0x393)][_0x107352(0x18a)](_0x378aa8))return![];}return!![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1e3c62=RegExp['$1'][_0x107352(0x1cc)](',');for(const _0x5d227b of _0x1e3c62){const _0xb18c23=DataManager[_0x107352(0x194)](_0x5d227b);if(!_0xb18c23)continue;if(!this[_0x107352(0x393)][_0x107352(0x18a)](_0xb18c23))return![];}return!![];}}if(_0x7a4b8d[_0x107352(0x1c9)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x470e70=JSON[_0x107352(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x39d6e3 of _0x470e70){if(!this[_0x107352(0x393)][_0x107352(0x18a)](_0x39d6e3))return![];}return!![];}else{if(_0x7a4b8d['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x23194e=RegExp['$1']['split'](',');for(const _0x3f1d91 of _0x23194e){const _0x2a1de3=DataManager[_0x107352(0x194)](_0x3f1d91);if(!_0x2a1de3)continue;if(!this['_actor'][_0x107352(0x18a)](_0x2a1de3))return![];}return!![];}}if(_0x7a4b8d['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x220564=JSON[_0x107352(0x263)]('['+RegExp['$1'][_0x107352(0x1c9)](/\d+/g)+']');for(const _0x55e20 of _0x220564){if(this[_0x107352(0x393)]['isLearnedSkill'](_0x55e20))return!![];}return![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1b0776=RegExp['$1']['split'](',');for(const _0x103fe4 of _0x1b0776){const _0x13064d=DataManager[_0x107352(0x194)](_0x103fe4);if(!_0x13064d)continue;if(this[_0x107352(0x393)][_0x107352(0x18a)](_0x13064d))return!![];}return![];}}if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35bd35=JSON['parse']('['+RegExp['$1'][_0x107352(0x1c9)](/\d+/g)+']');for(const _0x4b5711 of _0x35bd35){if(!this[_0x107352(0x393)]['isLearnedSkill'](_0x4b5711))return!![];}return![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xb04a0e=RegExp['$1'][_0x107352(0x1cc)](',');for(const _0x45a8c4 of _0xb04a0e){const _0x201c60=DataManager[_0x107352(0x194)](_0x45a8c4);if(!_0x201c60)continue;if(!this[_0x107352(0x393)]['isLearnedSkill'](_0x201c60))return!![];}return![];}}if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32596e=JSON[_0x107352(0x263)]('['+RegExp['$1'][_0x107352(0x1c9)](/\d+/g)+']');for(const _0x14dcdf of _0x32596e){if(!this['_actor'][_0x107352(0x18a)](_0x14dcdf))return!![];}return![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x454d90=RegExp['$1']['split'](',');for(const _0x5f42d0 of _0x454d90){const _0x53974f=DataManager[_0x107352(0x194)](_0x5f42d0);if(!_0x53974f)continue;if(!this[_0x107352(0x393)][_0x107352(0x18a)](_0x53974f))return!![];}return![];}}if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3603d5=JSON[_0x107352(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x297f6c of _0x3603d5){if(this[_0x107352(0x393)][_0x107352(0x18a)](_0x297f6c))return![];}return!![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x509e05=RegExp['$1']['split'](',');for(const _0x382344 of _0x509e05){const _0x2c4631=DataManager['getSkillIdWithName'](_0x382344);if(!_0x2c4631)continue;if(this[_0x107352(0x393)][_0x107352(0x18a)](_0x2c4631))return![];}return!![];}}if(_0x7a4b8d['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3416d4=JSON[_0x107352(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5eb1ff of _0x3416d4){if(!this[_0x107352(0x393)][_0x107352(0x36e)](_0x5eb1ff))return![];}return!![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x32bd8e=RegExp['$1'][_0x107352(0x1cc)](',');for(const _0x2eb387 of _0x32bd8e){const _0x5cd5f5=DataManager[_0x107352(0x194)](_0x2eb387);if(!_0x5cd5f5)continue;if(!this['_actor'][_0x107352(0x36e)](_0x5cd5f5))return![];}return!![];}}if(_0x7a4b8d['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5cc0ec=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x15adec of _0x5cc0ec){if(!this[_0x107352(0x393)][_0x107352(0x36e)](_0x15adec))return![];}return!![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4f9e8f=RegExp['$1']['split'](',');for(const _0x3aef8c of _0x4f9e8f){const _0x54e80f=DataManager[_0x107352(0x194)](_0x3aef8c);if(!_0x54e80f)continue;if(!this[_0x107352(0x393)][_0x107352(0x36e)](_0x54e80f))return![];}return!![];}}if(_0x7a4b8d['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x508513=JSON['parse']('['+RegExp['$1'][_0x107352(0x1c9)](/\d+/g)+']');for(const _0x4fd2fd of _0x508513){if(this[_0x107352(0x393)]['hasSkill'](_0x4fd2fd))return!![];}return![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3fa658=RegExp['$1'][_0x107352(0x1cc)](',');for(const _0x4229f0 of _0x3fa658){const _0x18ad9c=DataManager[_0x107352(0x194)](_0x4229f0);if(!_0x18ad9c)continue;if(this[_0x107352(0x393)][_0x107352(0x36e)](_0x18ad9c))return!![];}return![];}}if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2cd445=JSON[_0x107352(0x263)]('['+RegExp['$1'][_0x107352(0x1c9)](/\d+/g)+']');for(const _0x31015c of _0x2cd445){if(!this['_actor'][_0x107352(0x36e)](_0x31015c))return!![];}return![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3dda07=RegExp['$1'][_0x107352(0x1cc)](',');for(const _0x305b30 of _0x3dda07){const _0x4eca85=DataManager[_0x107352(0x194)](_0x305b30);if(!_0x4eca85)continue;if(!this[_0x107352(0x393)][_0x107352(0x36e)](_0x4eca85))return!![];}return![];}}if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x31ff23=JSON[_0x107352(0x263)]('['+RegExp['$1'][_0x107352(0x1c9)](/\d+/g)+']');for(const _0x421031 of _0x31ff23){if(!this[_0x107352(0x393)][_0x107352(0x36e)](_0x421031))return!![];}return![];}else{if(_0x7a4b8d['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4108c4=RegExp['$1'][_0x107352(0x1cc)](',');for(const _0x1537e1 of _0x4108c4){const _0xccc528=DataManager['getSkillIdWithName'](_0x1537e1);if(!_0xccc528)continue;if(!this[_0x107352(0x393)][_0x107352(0x36e)](_0xccc528))return!![];}return![];}}if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc95c61=JSON[_0x107352(0x263)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x223861 of _0xc95c61){if(this[_0x107352(0x393)][_0x107352(0x36e)](_0x223861))return![];}return!![];}else{if(_0x7a4b8d[_0x107352(0x1c9)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x41632f=RegExp['$1'][_0x107352(0x1cc)](',');for(const _0x2bebb8 of _0x41632f){const _0xa68246=DataManager['getSkillIdWithName'](_0x2bebb8);if(!_0xa68246)continue;if(this[_0x107352(0x393)][_0x107352(0x36e)](_0xa68246))return![];}return!![];}}return!![];},Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x37c)]=function(_0x18e26e){const _0x5b7ef7=_0xfbd732,_0x3b9aba=_0x18e26e['note'],_0x267812=VisuMZ[_0x5b7ef7(0x377)][_0x5b7ef7(0x2b7)];return _0x267812[_0x18e26e['id']]?_0x267812[_0x18e26e['id']]['call'](this,_0x18e26e):!![];},Window_SkillList[_0xfbd732(0x248)]['drawSkillCost']=function(_0x1c3cb7,_0x28a5f3,_0xcf8e6d,_0x37d3b3){const _0x1edafd=_0xfbd732;Window_Base[_0x1edafd(0x248)][_0x1edafd(0x2a5)][_0x1edafd(0x188)](this,this[_0x1edafd(0x393)],_0x1c3cb7,_0x28a5f3,_0xcf8e6d,_0x37d3b3);},Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x1f2)]=function(_0x43c44c){const _0x4228fb=_0xfbd732;this['_statusWindow']=_0x43c44c,this[_0x4228fb(0x2cc)]();},VisuMZ['SkillsStatesCore'][_0xfbd732(0x24a)]=Window_SkillList[_0xfbd732(0x248)][_0xfbd732(0x187)],Window_SkillList[_0xfbd732(0x248)]['updateHelp']=function(){const _0x353e42=_0xfbd732;VisuMZ['SkillsStatesCore'][_0x353e42(0x24a)][_0x353e42(0x188)](this),this[_0x353e42(0x1a5)]&&this[_0x353e42(0x1a5)][_0x353e42(0x1ce)]===Window_ShopStatus&&this[_0x353e42(0x1a5)][_0x353e42(0x2bd)](this['item']());};