import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, orderBy, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { query, where } from '@firebase/firestore';
import { getDownloadURL } from '@firebase/storage';
import { from, Observable, take, map, tap, flatMap, mergeMap, firstValueFrom } from 'rxjs';
import { AuthService } from './auth/auth.service';
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

    constructor(private db: Firestore, private storage: Storage) { }

    // Admin
    getAdmin(uid: string) {
        console.log(uid)
        return docData<Admin>(
            doc(this.db, this.ADMINS + uid) as DocumentReference<Admin>,
        );
    }

    // Sounds
    getSounds(): Observable<Sound[]> {
        const ref = collection(this.db, this.SOUNDS) as CollectionReference<Sound>;
        return collectionData(
            query(ref, orderBy("title")),
            { idField: 'id' }
        );
    }

    async createSound(sound: NewSound, file: File): Promise<void> {
        const newID = doc(collection(this.db, 'id')).id;
        const path = this.SOUNDS + newID + '/' + file.name;

        const ref = doc(this.db, this.SOUNDS + newID)
        return setDoc(ref, {
            title: sound.title,
            icon: sound.icon,
            categoryID: sound.categoryID,
            src: await this.uploadFile(path, file)
        });
    }

    async uploadFile(path: string, file: File): Promise<string> {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        return await getDownloadURL(storageRef);
    }

    updateSound(id: string, sound: Sound): Promise<void> {
        const ref = doc(this.db, this.SOUNDS + id) as DocumentReference<Sound>;
        return updateDoc(ref, {
            title: sound.title,
            icon: sound.icon,
            categoryID: sound.categoryID,
            src: sound.src
        });
    }

    deleteSound(id: string): Promise<void> {
        // TODO: add db rules to prevent deleting used categories
        const ref = doc(this.db, this.SOUNDS + id) as DocumentReference<NewSound>;
        return deleteDoc(ref);
    }

    // Categories
    getCategories(): Observable<Category[]> {
        return collectionData(
            query(
                collection(this.db, this.CATEGORIES) as CollectionReference<Category>,
                orderBy("name")
            ),
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
    getPresets(uid: string): Observable<Preset[]> {
        return collectionData(
            query(
                collection(this.db, this.PRESETS) as CollectionReference<Preset>,
                where('userID', '==', uid),
                orderBy("name")
            ),
            { idField: 'id' }
        );
    }

    createPreset(uid: string, preset: NewPreset): Promise<void> {
        console.log(uid)
        const newID = doc(collection(this.db, 'id')).id;
        const ref = doc(this.db, this.PRESETS + newID)
        return setDoc(ref, {
            name: preset.name,
            playerStates: preset.playerStates,
            userID: uid
        });
    }

    updatePreset(id: string, preset: Preset): Promise<void> {
        const ref = doc(this.db, this.PRESETS + id) as DocumentReference<Preset>;
        return updateDoc(ref, {
            name: preset.name,
            playerStates: preset.playerStates,
            userID: preset.userID
        });
    }

    updatePresetStates(preset: Preset, states: PlayerState[]) {
        const ref = doc(this.db, this.PRESETS + preset.id) as DocumentReference<NewPreset>;
        return updateDoc(ref, {
            name: preset.name,
            playerStates: states,
        });
    }

    deletePreset(id: string): Promise<void> {
        const ref = doc(this.db, this.PRESETS + id) as DocumentReference<NewPreset>;
        return deleteDoc(ref);
    }
}
