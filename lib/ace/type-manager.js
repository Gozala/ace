/* vim:ts=4:sts=4:sw=4:
 * ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Irakli Gozalishvili <rfobic@gmail.com> (http://jeditoolkit.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
define(function(require, exports, module) {

'use strict'

var Trait = require("light-traits").Trait

/**
 * Most of our types are 'static' e.g. there is only one type of 'text', however
 * some types like 'selection' and 'deferred' are customizable. The basic
 * Type type isn't useful, but does provide documentation about what types do.
 */
var TType = Trait({
    /**
     * Convert the given <tt>value</tt> to a string representation.
     * Where possible, there should be round-tripping between values and their
     * string representations.
     */
    toString: Trait.required,
    /**
     * Convert the given <tt>str</tt> to an instance of this type.
     * Where possible, there should be round-tripping between values and their
     * string representations.
     * @return Conversion
     */
    parse: Trait.required,
    /**
     * The plug-in system, and other things need to know what this type is
     * called. The name alone is not enough to fully specify a type. Types like
     * 'selection' and 'deferred' need extra data, however this function returns
     * only the name, not the extra data.
     * <p>In old bespin, equality was based on the name. This may turn out to be
     * important in Ace too.
     */
    name: Trait.required,
})

function Type(descriptor, prototype) {
    // Inheriting all the properties from given prototype or `Type.prototype`.
    var type = Trait(descriptor).create(prototype || Type.prototype)
    // Creating type out of the extended descriptor.
    return TType.create(type)
}
Type.prototype = Object.create(Type.prototype, Trait({
     /**
     * If there is some concept of a higher value, return it,
     * otherwise return undefined.
     */
    increment: function(value) {
        return undefined;
    },
    /**
     * If there is some concept of a lower value, return it,
     * otherwise return undefined.
     */
    decrement: function(value) {
        return undefined;
    },
    /**
     * There is interesting information (like predictions) in a conversion of
     * nothing, the output of this can sometimes be customized.
     * @return Conversion
     */
    getDefault: function() {
        return this.parse('');
    }
})

// Function is called every time a plugin gets plugged, checks if plugin
// provides `types` or `settings` and registers those.
function onPlug(event) {
    var env = event.name, plugin = event.plugin, types = plugin.types
    if (types) {
        Object.keys(types).forEach(function (name) {
            register(env, types[name], name)
        })
    }
}
// Function is called every time a plugin gets unplugged, checks if plugin
// provides `types` or `settings` and unregisters those.
function onUnplug(event) {
    var env = event.name, plugin = event.plugin, types = plugin.types
    if (types) {
        Object.keys(types).forEach(function (name) {
            unregister(env, name)
        })
    }
}

function getType(env, name, enabled) {
    var types = env.types
    return enabled === true ? types.enabled[name] :
           enabled === false ? types.disapled[name] :
           types.enabled[name] || types.disapled[name]
}

function register(env, descriptor, name) {
    var baseType, base, types

    base = descriptor.base
    types = env.types.enabled

    descriptor.name = name

    // If type derives from other getting a base type form environment.
    if (base) baseType = types[base]
    // If base type is already registered or if type has no base we create
    // a new type out of the given type `descriptor` and signal environment.
    if (baseType || !base) {
        env._emit('type:registered', {
            env: env,
            type: type = Type(descriptor, baseType)
        })

    // Otherwise we signal to the environment that type is can't be registered
    // since base was not found.
    } else {
        env._emit('type:broken', {
            env: env,
            descriptor: descriptor,
            reason: 'base type is not registered'
        })
    }
}

function unregister(env, name) {
    // TODO disable and remove type
}

exports.enable = function enable(type) {
    
}

exports.disable = function disable() {

}

exports.startup = function startup(event) {
    var env = event.env, plugins = event.plugins

    // Listening to the plugin startup / shutdowns
    env.on('plugin:startup', onPlug)
    env.on('plugin:shutdown', onUnplug)
    
    // Plugging all the active plugins
    Object.keys(plugins).forEach(function(name) {
        onPlug({ env: env, plugin: plugins[name] })
    })
}

exports.shutdown = function shutdown(event) {
    var env = event.env, enabled = env.types.enabled, disapled = env.types.disapled
    Object.keys(enabled).forEach(function(type) {
    })
}

exports.install = function install(event) {
    event.env.types = { enabled: {}, disapled: {}, installed: {} }
}

exports.uninstall = function uninstall(event) {
    delete event.env.types
}

});
