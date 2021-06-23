// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

/* eslint
@typescript-eslint/no-non-null-assertion: "off",
@typescript-eslint/no-explicit-any: "off",
 */

import { disabledKey, nightModeKey } from "components/contextKeys";
import { writable } from "svelte/store";

import TagEditor from "./TagEditor.svelte";
import "./bootstrap.css";

const disabled = writable(false);

export function initTagEditor(i18n: Promise<void>): Promise<TagEditor> {
    let tagEditorResolve: (value: TagEditor) => void;
    const tagEditorPromise = new Promise<TagEditor>((resolve) => {
        tagEditorResolve = resolve;
    });

    document.addEventListener("DOMContentLoaded", () =>
        i18n.then(() => {
            const target = document.body;
            const anchor = document.getElementById("fields")!;

            const context = new Map();
            context.set(disabledKey, disabled);
            context.set(
                nightModeKey,
                document.documentElement.classList.contains("night-mode")
            );

            tagEditorResolve(new TagEditor({ target, anchor, context } as any));
        })
    );

    return tagEditorPromise;
}

export {} from "./TagEditor.svelte";
