import firebase from 'firebase';

export class AuthService {
    isAuthenticated = false;
    user = 'not';

    signin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    signout() {
        firebase.auth().signOut();
    }
}