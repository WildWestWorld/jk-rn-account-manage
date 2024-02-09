import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Home() {
    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                <Text style={styles.root}>账号管理</Text>
            </View>
        )
    }


    return (
        <View style={styles.root}>
            {renderTitle()}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%'
    },
    titleLayout: {
        width: '100%',
        height: 46,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTxt:{
        fontSize:18,
        color:'#333333'
    }
})