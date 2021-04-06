<template>
	<view class="content"  @longpress="open" @click="open">
		<image class="bg" :src="styleData.url" ></image>
		<view class="info" :class="styleData.infoClass" >
			<view class="info-patient" v-for="(item,index) in data" :key="index">
				<view class="room" v-if="styleData.infoClass!='obstetrics'" :class="{textRoom:item.deptName.length>5}">{{item.deptName}}</view>
				<view class="clinique" :class="{textRoom:item.cliniqueName.length>6}">{{item.cliniqueName}}</view>
				<view class="room">{{item.doctor}}</view>
				<view class="seeing" style="color: #000099;">
					<text class="pr-15" v-show="item.callingSeq">{{item.callingSeq}}号</text>
					<text class="pl-15">{{item.calling}}</text>
				</view>
				<view class="waiting" >
					<text class="pr-15" v-show="item.waitingSeq">{{item.waitingSeq}}号</text>
				</view>
			</view>
		</view>
		
		<popupSet ref="popupSet" @confirm="confirm"  @close="close" :dataInit="dataPopup" :showChoseLine="true"></popupSet>
	</view>
</template>

<script>
import popupSet from '../../components/popup-set/popup-set.vue';
export default {
		components: { popupSet },
		data() {
			return {
				iType:'',
				title:'',
				screenNumber:'',
				popupShow:false,
				dateText: {
					year: '',
					month: '',
					date: '',
					day: '',
					time: ''
				},
				dataPopup:{
					title:'',
					iType:'',
					screenNumber:'',
					playSound:false,
					lineNumber:'ebh',
				},
				data:[],
				voiceData:[],
				voiceDataInit:[],
				voicePlayTiems:3,
				voicePlayNumber:0,
				testNumber:0,
				audioList:[],
				styleData:{
					url:'/static/allRoomBg_8.png',
					infoClass:'bg_8',
				},
				//测试数据
				res: {data:{"reload":"false",
					"Data":[
					{"deptCode":"2199","deptName":"临床营养科","cliniqueName":"耳鼻喉耳鼻","cliniqueCode":"5","techTitle":null,"doctor":"吴先杰","doctorPic":"吴先杰","introduction":null,"calling":"eee","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:52","waiting":"eee","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:52","amPm":"下午","status":null},
				
					{"deptCode":"2199","deptName":"耳鼻喉耳鼻喉科科","cliniqueName":"纤维鼻咽喉镜室","cliniqueCode":"1","techTitle":null,"doctor":"吴先杰","doctorPic":"吴先杰","introduction":null,"calling":"tt","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:42","waiting":"tt","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:42","amPm":"下午","status":null}
					],
					"ServerTime":"2021-01-15 13:00:07"}
				}
			};
		},
		onLoad() {
			this.dataPopup.lineNumber = uni.getStorageSync('lineNumber') || 'ebh';
			this.editStyle();
		},
		methods:{
			editStyle(){
				// {name:'耳鼻喉',value:'ebh'},
				// {name:'内科',value:'nk'},
				// {name:'骨伤科',value:'gsk'},
				// {name:'普外科',value:'pwk'},
				// {name:'疾病代谢',value:'jbdx'},
				// {name:'肛肠科',value:'gck'},
				// {name:'男科',value:'andrology'},
				// {name:'针灸推拿',value:'zjtn'},
				// {name:'产科',value:'ck'},
				this.init(this.res);
				switch(this.dataPopup.lineNumber) {
					case 'lzj':
						this.styleData = {
							url:'/static/allRoomBg_5.png',
							infoClass:'bg_5',
						}
						this.oldExpertRequest();
						break;
					case 'ck':
						this.styleData = {
							url:'/static/obstetrics.png',
							infoClass:'obstetrics',
						}
						this.obstetricsRequest();
						break;
					case 'zjtn':
						this.styleData = {
							url:'/static/allRoomBg_8.png',
							infoClass:'bg_8',
						}
						this.acupunctureRequest();
						break;
					case 'andrology':
						this.styleData = {
							url:'/static/allRoomBg_5.png',
							infoClass:'bg_5',
						}
						this.andrologyRequest();
						break;
					case 'gck':
						this.styleData = {
							url:'/static/allRoomBg_7.png',
							infoClass:'bg_7',
						}
						this.anorectalRequest();
						break;
					case 'jbdx':
						this.styleData = {
							url:'/static/allRoomBg_4.png',
							infoClass:'bg_4',
						}
						this.diseaseRequest();
						break;
					case 'pwk':
						this.styleData = {
							url:'/static/allRoomBg_6.png',
							infoClass:'bg_6',
						}
						this.generalSurgeryRequest();
						break;
					case 'nk':
						this.styleData = {
							url:'/static/allRoomBg_7.png',
							infoClass:'bg_7',
						}
						this.internalRequest();
						break;
					case 'ebh':
						this.styleData = {
							url:'/static/allRoomBg_8.png',
							infoClass:'bg_8',
						}
						this.nosethroatRequest();
						break;
					case 'gsk':
						this.styleData = {
							url:'/static/allRoomBg_8.png',
							infoClass:'bg_8',
						}
						this.boneInjuryRequest();
						break;
				}
			},
			// 打开设置
			open(){
				this.$refs.popupSet.open();
				this.popupShow = true;
			},
			// 关闭设置
			close(){
				this.popupShow = false;
				this.editStyle();
			},
			//确定设置
			confirm(res) {
				this.dataPopup = res;
				this.popupShow = false;
				this.data = [];
				this.editStyle();
			},
			// repeatRequest(tpyeName){
			// 	if (this.popupShow || this.dataPopup.lineNumber != tpyeName) {
			// 		return;
			// 	}
			// 	if(tpyeName == 'nk' || tpyeName == 'ck' || tpyeName == 'gsk' || tpyeName == 'pwk'){
			// 		this.internalRequest(tpyeName);
			// 	}else{
			// 		this.init(this.res);
			// 	}
			// },
			// 老专家
			oldExpertRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'lzj') {
					return;
				}
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/getQueueForInternal',
					method: 'POST',
					success: res => {
						try{
							this.init(res);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.oldExpertRequest();
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.oldExpertRequest();
						}, 6000);
					},
				});
			},
			// 产科
			obstetricsRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'ck') {
					return;
				}
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/getQueueForInternal',
					method: 'POST',
					success: res => {
						try{
							this.init(res);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.obstetricsRequest();
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.obstetricsRequest();
						}, 6000);
					},
				});
			},
			// 针灸推拿
			acupunctureRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'zjtn') {
					return;
				}
				this.init(this.res);
			},
			// 男科
			andrologyRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'andrology') {
					return;
				}
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/getQueueForInternal',
					method: 'POST',
					success: res => {
						try{
							this.init(res);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.andrologyRequest();
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.andrologyRequest();
						}, 6000);
					},
				});
			},
			// 肛肠科
			anorectalRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'gck') {
					return;
				}
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/getQueueForInternal',
					method: 'POST',
					success: res => {
						try{
							this.init(res);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.anorectalRequest();
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.anorectalRequest();
						}, 6000);
					},
				});
			},
			// 疾病代谢
			diseaseRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'jbdx') {
					return;
				}
				this.init(this.res);
			},
			// 普外
			generalSurgeryRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'pwk') {
					return;
				}
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/getQueueForInternal',
					method: 'POST',
					success: res => {
						try{
							this.init(res);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.generalSurgeryRequest();
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.generalSurgeryRequest();
						}, 6000);
					},
				});
			},
			// 骨伤
			boneInjuryRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'gsk') {
					return;
				}
				uni.request({ 
					url: 'http://129.1.20.21:8019/Queue/getQueueForInternal',
					method: 'POST',
					success: res => {
						try{
							this.init(res);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.boneInjuryRequest();
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.boneInjuryRequest();
						}, 6000);
					},
				});
			},
			// 耳鼻喉
			nosethroatRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'ebh') {
					return;
				}
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/playAllAudioForNosethroat',
					method: 'POST',
					success: res => {
						try{
							this.init(res);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.nosethroatRequest();
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.nosethroatRequest();
						}, 6000);
					},
				});
			},
			// 内科
			internalRequest(){
				if (this.popupShow || this.dataPopup.lineNumber != 'nk') {
					return;
				}
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/getQueueForInternal',
					method: 'POST',
					success: res => {
						try{
							this.init(res);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.internalRequest();
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.internalRequest();
						}, 6000);
					},
				});
			},
			init(res){
				console.log(res);
				let datas = res.data;
				this.dateText = this.geteDateText(datas.ServerTime);
				if(datas.reload=='true' || datas.reload==true){
					this.$tui.webView.postMessage({
						data: {
							reload:datas.reload
						}
					})
					return;
				}
				let dataMaps = [];
				let dataAudioList = [];
				let voiceDataInit = [];
				datas.Data.forEach((item,index) =>{
					let calling =item.calling?this.$util.hideName(item.calling):'';
					let waiting =item.waiting?this.$util.hideName(item.waiting):'';
					let dataMap = {
						cliniqueName: item.cliniqueName || '',
						calling: calling,
						callingSeq: item.callingSeq || '',
						waiting: waiting,
						waitingSeq: item.waitingSeq || '',
						doctor: item.doctor || '',
						deptName: item.deptName || '',
					}
					
					if(calling){
						let number = this.$util.chineseNumeral(item.callingSeq+'');
						let speakText = `请,${number}号,${item.calling}到,${item.deptName}就诊`;
						if(this.data.length==0){
							this.voiceData.push(speakText);
							this.voiceDataInit.push(speakText);
						}else{
							voiceDataInit = voiceDataInit.concat(speakText);
						}
					}
					if(this.data.length>0){
						if(dataMap.cliniqueName && calling == '' && this.data[index]){
							dataMap.calling = this.data[index].calling;
							dataMap.callingSeq = this.data[index].callingSeq;
						}
					}
					dataMaps = dataMaps.concat(dataMap);
				})
				if(voiceDataInit.length>0){
					this.voiceData = this.$util.findDifferentElements(voiceDataInit,this.voiceDataInit);
					this.voiceDataInit = voiceDataInit;
				}
				this.data = dataMaps;
				if(this.voiceData.length>0){
					this.voiceQueue();	
				}else{
					setTimeout(() => {
						this.editStyle()
					}, 6000);
				}
			},
			geteDateText(dataTime){
				let date = new Date(dataTime);
				let weekday = [ '星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
				return {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					date: date.getDate(),
					day: weekday[date.getDay()],
					time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
				};
			},
			// 语音队列
			voiceQueue(){
				let text = this.voiceData[0]; 
				console.log(text);
				this.$tui.webView.postMessage({
					data: {
						text:text
					}
				})
				if(this.voiceData.length>1){
					this.onDone(this.voiceData[1]);
				}else{
					this.onDone(this.voiceData[0]);
				}
			},
			// 播放完执行
			onDone(data){
				let date = 4300;
				if(data.length>12){
					date = date + ((data.length - 12)*300 ) 
				}
				setTimeout(() => {
					this.voicePlayNumber++;
					if(this.voicePlayNumber>=this.voicePlayTiems){
						this.voiceData.shift();
						this.voicePlayNumber = 0;
					}
					if(this.voiceData.length>0){
						this.voiceQueue()
					}else{
						setTimeout(() => {
							this.editStyle()
						}, 6000);
					}
				}, date);
				
			},
		}
	
};
</script>

<style lang="scss">
	@import '~@/pages/allBigRoom/room.scss';
</style>

