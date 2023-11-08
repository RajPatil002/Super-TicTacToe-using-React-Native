
import { Dimensions, Image, Modal, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'
import GlobalStyles from '../../widgets/styles'
import CodeBox from './codebox'
import ConnectModeBox from './connectmodebox'
import { CloseButton, ShadowButton } from '../../widgets/button'
import PlayersNameField from './playersnamefield'
import GameRules from '../game/gamerules'
import Icon from 'react-native-vector-icons/FontAwesome5'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HomePage: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<stackParams>>()

    // home page 10x images 
    const [bottom, setBottomImage] = useState<any>(require('./../../../assets/img/bottom_10x.png'))
    const [title, setTitleImage] = useState<any>(require('./../../../assets/img/super_tic_tac_toe_10x.png'))

    // prefetch 25x images
    const prefetch = async () => {
        const bottom = await require('./../../../assets/img/bottom_25x.png')
        const title = await require('./../../../assets/img/super_tic_tac_toe_25x.png')
        setBottomImage(bottom)
        setTitleImage(title)
    }

    useEffect(() => {
        prefetch();
    }, [])

    // pop-ups
    const [onlinemode, setOnlineModeVisible] = useState(false)
    const [namefields, setNameField] = useState(false)
    const codebox = useState(false)
    const [rulesbox, setRulesBox] = useState(false)




    return (
        <View style={[GlobalStyles.center, GlobalStyles.background]}>

            {/* online mode select */}
            <Modal
                visible={onlinemode}
                onRequestClose={codebox[0] ? () => codebox[1](false) : () => setOnlineModeVisible(false)}
                transparent>
                <View style={[GlobalStyles.center, { flex: 1, backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, style.box]}>
                        <CloseButton
                            onPress={codebox[0] ? () => {
                                codebox[1](false)
                            } : () => setOnlineModeVisible(false)} />
                        {codebox[0]
                            ? <CodeBox
                                visiblecodebox={codebox}
                                onStart={(port) => {
                                    setOnlineModeVisible(false)
                                    navigation.navigate('OnlineGamePage', { port: port, })
                                }}
                            />
                            : <ConnectModeBox
                                visiblecodebox={codebox}
                                onStart={(port, createdbyid) => {
                                    setOnlineModeVisible(false)
                                    navigation.navigate('OnlineGamePage', { port, createdbyid })
                                }}
                            />}
                    </View>
                </View>
            </Modal>

            {/* Name field for offline play*/}
            <Modal
                visible={namefields}
                onRequestClose={() => setNameField(false)}
                transparent>
                <View style={[GlobalStyles.center, { flex: 1, backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, style.box]}>
                        <CloseButton
                            onPress={() => setNameField(false)} />
                        <PlayersNameField onStart={(players) => {
                            console.log(players)
                            setNameField(false)
                            navigation.navigate('OfflineGamePage', { players: players })
                        }} />

                    </View>
                </View>
            </Modal>


            {/* Rules */}
            <Modal
                visible={rulesbox}
                onRequestClose={() => setRulesBox(false)}
                transparent>
                <View style={[GlobalStyles.center, { flex: 1, backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, style.box]}>
                        <CloseButton
                            onPress={() => setRulesBox(false)} />
                        <GameRules />
                    </View>
                </View>
            </Modal>


            <View style={{ flex: 1, }}>
                <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                    <View style={{ flex: 4 }}></View>
                    <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                        <Image
                            source={bottom}
                            style={style.image}
                            width={100}
                            resizeMode='contain'
                        />
                        <View style={[{ position: 'absolute', flex: 1 }, GlobalStyles.center]}>
                            <ShadowButton label={'Online'}
                                textStyles={GlobalStyles.buttontext}
                                style={GlobalStyles.button}
                                elevation={5}
                                onPress={() => {
                                    setOnlineModeVisible(false)
                                    setOnlineModeVisible(true)
                                }}
                            />
                            <ShadowButton label={'Offline'}
                                textStyles={GlobalStyles.buttontext}
                                style={GlobalStyles.button}
                                elevation={5}
                                onPress={() => setNameField(true)}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute' }}>
                    <View style={style.banner}>
                        <Image
                            source={title}
                            style={style.image}
                            width={100}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={{ position: "absolute", alignSelf: 'flex-start', margin: width * 0.05 }}>
                    <Icon.Button
                        name='lightbulb' size={width * 0.07} color={"#ebce3d"}
                        backgroundColor={"#00000000"}
                        onPress={() => {
                            setRulesBox(true)
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    box: { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 },
    banner: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        margin: 20,
        width: width,
        height: height * 0.6,
    },

})
export default HomePage
