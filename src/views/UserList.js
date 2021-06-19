import React, { useContext } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { ListItem, Avatar, Button, Icon } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    const confirmUserDeletion = (user) => {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    const getUserItem = ({ item }) => (
        <ListItem
            key={item.id}
            bottomDivider
            onPress={() => props.navigation.navigate('UserForm')}            >
            <Avatar source={{ uri: item.avatarUrl }} rounded />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
                onPress={() => props.navigation.navigate('UserForm', item)}
                type='clear'
                icon={<Icon name='edit' size={25} color='orange' />}
            />
            <Button
                onPress={() => confirmUserDeletion(item)}
                type='clear'
                icon={<Icon name='delete' size={25} color='red' />}
            />
        </ListItem>
    )

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}