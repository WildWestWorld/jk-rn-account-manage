import { Image, StyleSheet, Text, TouchableOpacity, View, SectionList, LayoutAnimation, Alert, Switch } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import AddAccount from '../components/AddAccount'
import { storageLoad, storageSave } from '../utils/storage'

import icon_add from '../assets/images/icon_add.png'
import icon_game from '../assets/images/icon_game.png'
import icon_platform from '../assets/images/icon_platform.png'
import icon_bank from '../assets/images/icon_bank.png'
import icon_other from '../assets/images/icon_game.png'

import icon_arrow from '../assets/images/icon_arrow.png'

const iconMap = {
    '游戏': icon_game,
    '平台': icon_platform,
    '银行卡': icon_bank,
    '其他': icon_other
}


export default function Home() {

    const addAcountRef = useRef(null)

    const [sectionData, setSectionData] = useState([])

    const [sectionState, setSectionState] = useState({
        '游戏': false,
        '平台': true,
        '银行卡': true,
        '其他': true
    })

    const [passwordOpen, setPasswordOpen] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        storageLoad('accountList').then(data => {

            const accountList = JSON.parse(data)

            const gameList = accountList.filter(item => item.type === '游戏') || [];
            const platformList = accountList.filter(item => item.type === '平台') || [];
            const bankList = accountList.filter(item => item.type === '银行卡') || [];
            const otherList = accountList.filter(item => item.type === '其他') || [];

            const sectionData = [
                { type: '游戏', data: gameList },
                { type: '平台', data: platformList },
                { type: '银行卡', data: bankList },
                { type: "其他", data: otherList }
            ]

            LayoutAnimation.easeInEaseOut();

            setSectionData(sectionData)

        })

    }

    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                <Text style={styles.titleTxt}>账号管理</Text>
                <Switch style={styles.switch} value={passwordOpen} onValueChange    ={value => {
                    console.log(`value=${value}`)
                    setPasswordOpen(value);
                }}></Switch>

            </View>
        )
    }

    const renderItem = ({ item, index, section }) => {
        if (!sectionState[section.type]) {
            return null
        }


        return (
            <TouchableOpacity style={styles.itemLayout}


                onPress={() => {
                    addAcountRef.current.show(item)
                }}

                onLongPress={() => {
                    const buttons = [
                        { text: '取消', onPress: () => { } },
                        { text: '确认', onPress: () => deleteAccount(item) },

                    ]
                    Alert.alert('提示', `确定删除${item.name}账号吗？`, buttons)
                }}
            >
                <Text style={styles.nameTxt}>{item.name}</Text>
                <View style={styles.accpwdLayout}>
                    <Text style={styles.accpwdTxt}>{`账号: ${item.account}`}</Text>
                    <Text style={styles.accpwdTxt}>{`密码: ${passwordOpen?item.password:'******'}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    const deleteAccount = (account) => {
        storageLoad('accountList').then(data => {
            let accountList = JSON.parse(data);
            accountList = accountList.filter(item => item.id !== account.id)
            storageSave('accountList', JSON.stringify(accountList)).then(() => {
                loadData()
            })
        })
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <View style={[styles.groupHeader,
            {
                borderBottomLeftRadius: (!section.data.length || !sectionState[section.type]) ? 12 : 0,
                borderBottomRightRadius: (!section.data.lengthh || !sectionState[section.type]) ? 12 : 0
            }]}>
                <Image style={styles.typeImg} source={iconMap[section.type]}></Image>
                <Text style={styles.typeTxt}>{section.type}</Text>

                <TouchableOpacity style={styles.arrowButton} onPress={() => {
                    const copy = { ...sectionState };
                    copy[section.type] = !copy[section.type];

                    LayoutAnimation.easeInEaseOut();


                    setSectionState(copy)

                }}>
                    <Image style={[styles.arrowImg, {
                        transform: [{ rotate: sectionState[section.type] ? '0deg' : '-90deg' }]
                    }]} source={icon_arrow}></Image>
                </TouchableOpacity>


            </View>
        )

    }


    return (
        <View style={styles.root}>
            {renderTitle()}

            <SectionList sections={sectionData} keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.listContainer}
            ></SectionList>


            <TouchableOpacity style={styles.addButton} activeOpacity={0.5} onPress={() => {
                addAcountRef.current.show();
            }}>
                <Image source={icon_add} style={styles.addImg}></Image>
            </TouchableOpacity>

            <AddAccount ref={addAcountRef} onSave={() => loadData()}></AddAccount>

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F0F0'
    },
    titleLayout: {
        width: '100%',
        height: 46,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTxt: {
        fontSize: 18,
        color: '#333333',
        fontWeight: 'bold'
    },
    addButton: {
        position: 'absolute',
        bottom: 64,
        right: 28
    },
    addImg: {
        width: 56,
        height: 56,
        resizeMode: 'contain'
    },
    groupHeader: {
        width: '100%',
        height: 46,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 12,
    },
    typeImg: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    listContainer: {
        paddingHorizontal: 12,
    },
    typeTxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 16
    },
    arrowButton: {
        position: 'absolute',
        right: 0,
        padding: 16
    },
    arrowImg: {
        width: 20,
        height: 20
    },
    itemLayout: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
    },
    nameTxt: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold'
    },
    accpwdLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    accpwdTxt: {
        flex: 1,
        fontSize: 14,
        color: '#666666',
        marginTop: 12,
        marginBottom: 6
    },
    switch: {
        position: 'absolute',
        right: 12
    }
})