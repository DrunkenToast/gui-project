import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Admin } from './models/admin-data';
import { Category, NewCategory } from './models/category-data';
import { NewPreset, PlayerState, Preset } from './models/preset-data';
import { NewSound, Sound } from './models/sound-data';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private readonly CATEGORIES = 'categories/';
    private readonly SOUNDS = 'sounds/';
    private readonly PRESETS = 'presets/';
    private readonly ADMINS = 'admins/';

    constructor(private db: Firestore) {}

    // Admin
    getAdmin(uid: string) {
        return docData<Admin>(
            doc(this.db, this.ADMINS + uid) as DocumentReference<Admin>
        );
    }

    // Sounds
    getSounds(): Observable<Sound[]> {
        return collectionData(
            collection(this.db, this.SOUNDS) as CollectionReference<Sound>,
            { idField: 'id' }
        );
    }

    createSound(sound: NewSound): Promise<void> {
        const newID = doc(collection(this.db, 'id')).id;
        const ref = doc(this.db, this.SOUNDS + newID)
        return setDoc(ref, sound);
    }

    updateSound(id: string, Sound: NewSound): Promise<void> {
        const ref = doc(this.db, this.SOUNDS + id) as DocumentReference<NewSound>;
        return updateDoc(ref, Sound);
    }

    deleteSound(id: string): Promise<void> {
        // TODO: add db rules to prevent deleting used categories
        const ref = doc(this.db, this.SOUNDS + id) as DocumentReference<NewSound>;
        return deleteDoc(ref);
    }

    // Categories
    getCategories(): Observable<Category[]> {
        return collectionData(
            collection(this.db, this.CATEGORIES) as CollectionReference<Category>,
            { idField: 'id' }
        );
    }

    createCategory(categoryName: string): Promise<void> {
        const newID = doc(collection(this.db, 'id')).id;
        const ref = doc(this.db, this.CATEGORIES + newID)
        return setDoc(ref, {
            name: categoryName
        });
    }

    updateCategory(id: string, categoryName: string): Promise<void> {
        const ref = doc(this.db, this.CATEGORIES + id) as DocumentReference<NewCategory>;
        return updateDoc(ref, {
            name: categoryName
        });
    }

    deleteCategory(id: string): Promise<void> {
        // TODO: add db rules to prevent deleting used categories
        const ref = doc(this.db, this.CATEGORIES + id) as DocumentReference<NewCategory>;
        return deleteDoc(ref);
    }

    // Presets
    getPresets(): Observable<Preset[]> {
        return collectionData(
            collection(this.db, this.PRESETS) as CollectionReference<Preset>,
            { idField: 'id' }
        );
    }

    createPreset(Preset: NewPreset): Promise<void> {
        const newID = doc(collection(this.db, 'id')).id;
        const ref = doc(this.db, this.PRESETS + newID)
        return setDoc(ref, Preset);
    }

    updatePreset(id: string, preset: NewPreset): Promise<void> {
        const ref = doc(this.db, this.PRESETS + id) as DocumentReference<NewPreset>;
        return updateDoc(ref, preset);
    }

    updatePresetStates(preset: Preset, states: PlayerState[]) {
        const ref = doc(this.db, this.PRESETS + preset.id) as DocumentReference<NewPreset>;
        return updateDoc(ref, {
            name: preset.name,
            playerStates: states,
        });
    }

    deletePreset(id: string): Promise<void> {
        // TODO: add db rules to prevent deleting used categories
        const ref = doc(this.db, this.PRESETS + id) as DocumentReference<NewPreset>;
        return deleteDoc(ref);
    }
}
