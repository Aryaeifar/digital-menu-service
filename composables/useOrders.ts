
export default function () {
    const { $storage } = useNuxtApp()

    let params = $storage.get('user');

    const user = useState<any>('user', () => (params || null))
    
    const getUser = () : any => {
        return user.value
    }

    const setUser = (params: any) => {
        $storage.set('user', params);
        user.value = params
    }

    const clearUserData = () => {
        $storage.remove('user');
        user.value = null
    }

    return {
        getUser,
        setUser,
        clearUserData
    }
}
