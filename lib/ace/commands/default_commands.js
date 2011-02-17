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
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *      Julian Viereck <julian.viereck@gmail.com>
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

var lang = require("pilot/lang");
var canon = require("pilot/canon");

exports.commands = {
    "null": {
        exec: function(env, args, request) {  }
    },
    selectall: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectAll();
        }
    },
    removeline: {
        exec: function(env, args, request) { env.editor.removeLines(); }
    },
    gotoline: {
        exec: function(env, args, request) {
            var line = parseInt(prompt("Enter line number:"));
            if (!isNaN(line)) {
                env.editor.gotoLine(line);
            }
        }
    },
    togglecomment: {
        exec: function(env, args, request) { env.editor.toggleCommentLines(); }
    },
    findnext: {
        exec: function(env, args, request) { env.editor.findNext(); }
    },
    findprevious: {
        exec: function(env, args, request) { env.editor.findPrevious(); }
    },
    find: {
        exec: function(env, args, request) {
            var needle = prompt("Find:");
            env.editor.find(needle);
        }
    },
    undo: {
        exec: function(env, args, request) { env.editor.undo(); }
    },
    redo: {
        exec: function(env, args, request) { env.editor.redo(); }
    },
    overwrite: {
        exec: function(env, args, request) { env.editor.toggleOverwrite(); }
    },
    copylinesup: {
        exec: function(env, args, request) { env.editor.copyLinesUp(); }
    },
    movelinesup: {
        exec: function(env, args, request) { env.editor.moveLinesUp(); }
    },
    selecttostart: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectFileStart();
        }
    },
    gotostart: {
        exec: function(env, args, request) { env.editor.navigateFileStart(); }
    },
    selectup: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectUp();
        }
    },
    golineup: {
        exec: function(env, args, request) {
            env.editor.navigateUp(args.times);
        }
    },
    copylinesdown: {
        exec: function(env, args, request) { env.editor.copyLinesDown(); }
    },
    movelinesdown: {
        exec: function(env, args, request) { env.editor.moveLinesDown(); }
    },
    selecttoend: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectFileEnd();
        }
    },
    gotoend: {
        exec: function(env, args, request) { env.editor.navigateFileEnd(); }
    },
    selectdown: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectDown();
        }
    },
    golinedown: {
        exec: function(env, args, request) {
            env.editor.navigateDown(args.times);
        }
    },
    selectwordleft: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectWordLeft();
        }
    },
    gotowordleft: {
        exec: function(env, args, request) {
            env.editor.navigateWordLeft();
        }
    },
    selecttolinestart: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectLineStart();
        }
    },
    gotolinestart: {
        exec: function(env, args, request) {
            env.editor.navigateLineStart();
        }
    },
    selectleft: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectLeft();
        }
    },
    gotoleft: {
        exec: function(env, args, request) {
            env.editor.navigateLeft(args.times);
        }
    },
    selectwordright: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectWordRight();
        }
    },
    gotowordright: {
        exec: function(env, args, request) { env.editor.navigateWordRight(); }
    },
    selecttolineend: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectLineEnd();
        }
    },
    gotolineend: {
        exec: function(env, args, request) { env.editor.navigateLineEnd(); }
    },
    selectright: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectRight();
        }
    },
    gotoright: {
        exec: function(env, args, request) {
            env.editor.navigateRight(args.times);
        }
    },
    selectpagedown: {
        exec: function(env, args, request) { env.editor.selectPageDown(); }
    },
    pagedown: {
        exec: function(env, args, request) { env.editor.scrollPageDown(); }
    },
    gotopagedown: {
        exec: function(env, args, request) { env.editor.gotoPageDown(); }
    },
    selectpageup: {
        exec: function(env, args, request) { env.editor.selectPageUp(); }
    },
    pageup: {
        exec: function(env, args, request) { env.editor.scrollPageUp(); }
    },
    gotopageup: {
        exec: function(env, args, request) { env.editor.gotoPageUp(); }
    },
    selectlinestart: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectLineStart();
        }
    },
    gotolinestart: {
        exec: function(env, args, request) { env.editor.navigateLineStart(); }
    },
    selectlineend: {
        exec: function(env, args, request) {
            env.editor.getSelection().selectLineEnd();
        }
    },
    gotolineend: {
        exec: function(env, args, request) { env.editor.navigateLineEnd(); }
    },
    del: {
        exec: function(env, args, request) { env.editor.removeRight(); }
    },
    backspace: {
        exec: function(env, args, request) { env.editor.removeLeft(); }
    },
    outdent: {
        exec: function(env, args, request) { env.editor.blockOutdent(); }
    },
    indent: {
        exec: function(env, args, request) { env.editor.indent(); }
    },
    inserttext: {
        exec: function(env, args, request) {
            env.editor.insert(lang.stringRepeat(args.text  || "",
                                                args.times || 1));
        }
    }
};

});
