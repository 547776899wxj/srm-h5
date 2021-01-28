<template>
	<view class="content" @longpress="open" @click="open">
		<image class="bg" src="/static/famous.png"></image>
		<view class="header">
			<!-- <view class="header-title">{{ title }}</view> -->
			<view class="header-time">
				<view>
					<text>{{ dateText.year }}年{{ dateText.month }}月{{ dateText.date }}日</text>
				</view>
				<view>
					<text class="pr-15">{{ dateText.day }}</text>
					<text>{{ dateText.time }}</text>
				</view>
			</view>
		</view>
		<view class="info">
			<view class="info-patient" v-for="(item, index) in data" :key="index">
				<view class="name">
					<!-- <text class="pr-15" v-if="item.number">{{ item.number }}号</text> -->
					<text class="pl-15">{{ item.name }}</text>
				</view>
				<view class="room">{{ item.room }}</view>
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" @close="close" :dataInit="dataPopup" :showPlaySound="true" :showIType="true" :showScreenNumber="true"></popupSet>
	</view>
</template>

<script>
import popupSet from '../../components/popup-set/popup-set.vue';
// #ifdef APP-PLUS
	var FvvUniTTS = uni.requireNativePlugin('Fvv-UniTTS');
// #endif

export default {
	components: { popupSet },
	data() {
		return {
			dateText: {
				year: '',
				month: '',
				date: '',
				day: '',
				time: ''
			},
			title: '',
			weekday: [],
			data: [
				// {
				// 	room:'科室1',
				// 	number:'A1002',
				// 	name:'张无忌',
				// },
			],
			cliniqueCode: '',
			iType: '',
			popupShow: false,
			seqNumber: '',
			screenNumber: '',
			playSound:false,
			voiceDataInit:[],
			voiceData:[],
			
			test: '测试',
			testNubmer: 0,
			dataPopup:{
				title:'',
				iType:'',
				screenNumber:'',
				playSound:false,
			},
			reload:false
		};
	},
	onLoad() {
		this.iType = uni.getStorageSync('iType') || '';
		this.screenNumber = uni.getStorageSync('screenNumber') || '';
		this.playSound = uni.getStorageSync('playSound') || false;
		this.weekday = new Array(7);
		this.weekday[0] = '星期日';
		this.weekday[1] = '星期一';
		this.weekday[2] = '星期二';
		this.weekday[3] = '星期三';
		this.weekday[4] = '星期四';
		this.weekday[5] = '星期五';
		this.weekday[6] = '星期六';
		if (this.iType && this.screenNumber) {
			this.init();
			this.dataPopup.iType = this.iType;
			this.dataPopup.screenNumber = this.screenNumber;
			this.dataPopup.playSound = this.playSound;
			
		}
	},
	methods: {
		//当前时间
		newDate(dataTime) {
			let date = new Date(dataTime);
			this.dateText = {
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				date: date.getDate(),
				day: this.weekday[date.getDay()],
				time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
			};
		},
		// 打开设置
		open(){
			this.$refs.popupSet.open();
			this.popupShow = true;
		},
		// 关闭设置
		close(){
			this.popupShow = false;
			if (this.iType && this.screenNumber) {
				this.init();
			}
		},
		//确定设置
		confirm(res) {
			this.iType = res.iType;
			this.screenNumber = res.screenNumber;
			this.playSound = res.playSound;
			this.popupShow = false;
			this.init();
		},
		// 初始化数据
		init() {
			if (this.popupShow) {
				return false;
			}
			// 测试使用
// 			let res = {data:{"Data":[
// {"ghhbid":"434144","dept_code":"2149","dept_name":"名医苑","clinique_name":"专家门诊1","clinique_code":"620","tech_title":null,"doctor":"刘建忠","doctor_pic":null,"calling":"刘建忠","calling_seq":"1231","calling_pre_time":null,"waiting":"高权","waiting_seq":"1","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":"陈兰","dqjzxh":"2"},

// {"ghhbid":"434149","dept_code":"2149","dept_name":"名医苑","clinique_name":"专家门诊2","clinique_code":"616","tech_title":null,"doctor":"肖定远","doctor_pic":null,"calling":"武则天","calling_seq":"1232","calling_pre_time":null,"waiting":"高权","waiting_seq":"2","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":"陈兰英","dqjzxh":"1"},

// {"ghhbid":"434150","dept_code":"2149","dept_name":"名医苑","clinique_name":"专家门诊3","clinique_code":"623","tech_title":null,"doctor":"金彪","doctor_pic":null,"calling":"杨贵妃","calling_seq":"1233","calling_pre_time":null,"waiting":"高权","waiting_seq":"3","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":"傅彩云","dqjzxh":"6"},

// {"ghhbid":"434144","dept_code":"2149","dept_name":"名医苑","clinique_name":"专家门诊4","clinique_code":"620","tech_title":null,"doctor":"刘建忠","doctor_pic":null,"calling":"瞌睡乔","calling_seq":"1234","calling_pre_time":null,"waiting":"高权","waiting_seq":"4","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":"陈兰英","dqjzxh":"1"},

// {"ghhbid":"434149","dept_code":"2149","dept_name":"名医苑","clinique_name":"专家门诊5","clinique_code":"616","tech_title":null,"doctor":"肖定远","doctor_pic":null,"calling":"川建国","calling_seq":"1235","calling_pre_time":null,"waiting":"高权","waiting_seq":"5","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":"陈兰英","dqjzxh":"1"}

// ],"ServiceTime":"2020-09-08 16:41:01"}}
			// res.data.Data[0].calling_seq = res.data.Data[0].calling_seq + this.testNubmer++;
			
			uni.request({
				url: 'http://129.1.20.21:8019/Queue/mmy_Get_Queue',
				data: {
					dept_code: this.iType,
					Clinique_code: this.screenNumber,
				},
				success: res => {
					let datas = res.data.Data;
					if(res.data.reload=='true' && this.reload!=res.data.reload){
						this.$tui.webView.postMessage({
							data: {
								reload:res.data.reload
							}
						})
					}
					this.reload = res.data.reload;
					let dataMaps = [];
					let voiceDataInit = [];
					this.newDate(res.data.ServiceTime);
					datas.forEach((data, index) => {
						let name = this.$util.hideName(data.calling);
						let dataMap = {
							room: data.clinique_name,
							number:data.calling_seq,
							name: name
						};
						dataMaps = dataMaps.concat(dataMap);
						if(name && this.playSound){
							let number = this.$util.chineseNumeral(dataMap.number+'')||'';
							number = number?number+'号,':'';
							let speakText = `请,${number}${data.calling}到,${dataMap.room},检查`;
							if(this.data.length==0){
								this.voiceData.push(speakText);
								this.voiceDataInit.push(speakText);
							}else{
								voiceDataInit = voiceDataInit.concat(speakText);
							}
						}
					});
					this.data = dataMaps;
					if(this.playSound){
						if(voiceDataInit.length>0){
							this.voiceData = this.$util.findDifferentElements(voiceDataInit,this.voiceDataInit);
							this.voiceDataInit = voiceDataInit;
						}
						if(this.voiceData.length>0){
							this.voiceQueue();	
						}else{
							setTimeout(() => {
								this.init()
							}, 5000);
						}
					}else{
						setTimeout(() => {
							this.init();
						}, 5000);
					}	
				},
				fail: res => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
					setTimeout(() => {
						this.init();
					}, 5000);
				}
			});
		},
		// 语音队列
		voiceQueue(){
			// #ifdef APP-PLUS
				FvvUniTTS.init((callback) => {
					FvvUniTTS.speak({
						text:this.voiceData[0]
					});
				});
			// #endif
			console.log(this.voiceData[0]);
			if(this.voiceData.length>1){
				this.onDone(this.voiceData[1]);
			}else{
				let date = 4300;
				if(this.voiceData[0].length>12){
					date = date + ((this.voiceData[0].length - 12)*300 ) 
				}
				setTimeout(() => {
					this.init()
				}, date);
			}
		},
		// 播放完执行
		onDone(data){
			let date = 4300;
			if(data.length>12){
				date = date + ((data.length - 12)*300 ) 
			}
			setTimeout(() => {
				this.voiceData.shift();
				if(this.voiceData.length>0){
					this.voiceQueue()
				}else{
					setTimeout(() => {
						this.init()
					}, 5000);
				}
				
			}, date);
			
		},
	}
};
</script>

<style>
.pr-15 {
	padding-right: 15px;
}
.pl-15 {
	padding-left: 15px;
}
page {
	height: 100%;
}
.header {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 300px;
}
.room {
    width: 665px;
    margin-left: 71px;
}
.content {
	position: relative;
	height: 100%;
}

.bg {
	position: absolute;
	height: 1080px;
	width: 1920px;
	z-index: -1;
}
.header-time {
	display: flex;
	position: absolute;
	justify-content: center;
	flex-direction: column;
    right: 117px;
    padding-top: 15px;
    bottom: 60px;
}
.header-title {
	color: rgb(253, 250, 7);
	font-size: 63px;
	font-weight: 800;
	letter-spacing: 12px;
}
.header-time view {
	font-size: 40px;
	color: #000;
	letter-spacing: 5px;
}
.info {
	padding-left: 139px;
	padding-right: 139px;
}
.info-patient {
	display: flex;
	height: 136px;
}
.name {
    width: 468px;
	margin-left: 174px;
}
.info-patient view {
	font-size: 60px;
	color: rgb(205,44,47);
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>
