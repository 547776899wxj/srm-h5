<template>
	<!-- <view class="content"  @longpress="open" @click="open">
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
	</view> -->
	<view class="content" @longpress="open" @click="open">
		<image class="bg" :src="styleData.url" ></image>
		<popupSet ref="popupSet" @confirm="confirm"  @close="close" :dataInit="dataPopup" :showChoseLine="true"></popupSet>
		<button type="default" @click="test()" style="position: relative;left: 0;">测试</button>
		<button type="default" @click="test()" style="position: relative;left: 0;">测试</button>
		<button type="default" @click="test()" style="position: relative;left: 0;">测试</button>
		<button type="default" @click="test()" style="position: relative;left: 0;">更新</button>
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
				typeName:'',
				//测试数据
				res: {data:{"reload":"false",
					"Data":[
					{"deptCode":"2199","deptName":"耳鼻喉耳鼻","cliniqueName":"内镜一","cliniqueCode":"5","techTitle":null,"doctor":"吴先杰","doctorPic":"吴先杰","introduction":null,"calling":"eee","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:52","waiting":"eee","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:52","amPm":"下午","status":null},
				
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
			test(){
				location.reload();
				
			},
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
				
				
				// 切换科室时防止重复调用
				// console.log('outtypeName: '+this.typeName+'lineNumber: '+this.dataPopup.lineNumber);
				// if(this.typeName && this.typeName != this.dataPopup.lineNumber && !pass){
				// 	console.log('typeName: '+this.typeName+'lineNumber: '+this.dataPopup.lineNumber);
				// 	return;
				// }
				
				switch(this.dataPopup.lineNumber) {
					case 'ck':
						this.styleData = {
							url:'/static/obstetrics.png',
							infoClass:'obstetrics',
						}
						this.repeatRequest('ck');
						break;
					case 'zjtn':
						this.styleData = {
							url:'/static/allRoomBg_8.png',
							infoClass:'bg_8',
						}
						this.repeatRequest('zjtn');
						break;
					case 'andrology':
						this.styleData = {
							url:'/static/allRoomBg_5.png',
							infoClass:'bg_5',
						}
						this.repeatRequest('andrology');
						break;
					case 'gck':
						this.styleData = {
							url:'/static/allRoomBg_7.png',
							infoClass:'bg_7',
						}
						this.repeatRequest('gck');
						break;
					case 'jbdx':
						this.styleData = {
							url:'/static/allRoomBg_4.png',
							infoClass:'bg_4',
						}
						this.repeatRequest('jbdx');
						break;
					case 'pwk':
						this.styleData = {
							url:'/static/allRoomBg_6.png',
							infoClass:'bg_6',
						}
						this.repeatRequest('pwk');
						break;
					case 'nk':
						this.styleData = {
							url:'/static/allRoomBg_7.png',
							infoClass:'bg_7',
						}
						this.repeatRequest('nk');
						break;
					case 'ebh':
						this.styleData = {
							url:'/static/allRoomBg_8.png',
							infoClass:'bg_8',
						}
						this.repeatRequest('ebh');
						break;
					case 'gsk':
						this.styleData = {
							url:'/static/allRoomBg_8.png',
							infoClass:'bg_8',
						}
						this.repeatRequest('gsk');
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
				this.editStyle(true);
			},
			repeatRequest(tpyeName){
				console.log('repeatRequest'+tpyeName);
				if (this.popupShow || this.dataPopup.lineNumber != tpyeName) {
					console.log('repeatRequest:return;'+tpyeName);
					return;
				}
				// if(tpyeName == 'nk' || tpyeName == 'ck' || tpyeName == 'gsk' || tpyeName == 'pwk'){
				// 	this.internalRequest(tpyeName);
				// }else{
				// 	this.init(this.res,tpyeName);
				// }
			},
			// 内科
			internalRequest(tpyeName){
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/getQueueForInternal',
					method: 'POST',
					success: res => {
						try{
							this.init(res,tpyeName);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.repeatRequest(tpyeName);
							}, 6000);
						}
					},
					fail: (err) => {
						setTimeout(() => {
							this.repeatRequest(tpyeName);
						}, 6000);
					},
				});
			},
			init(res,typeName){
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
					this.voiceQueue(typeName);	
				}else{
					setTimeout(() => {
						this.repeatRequest(typeName)
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
			voiceQueue(typeName){
				let text = this.voiceData[0]; 
				console.log(text);
				this.$tui.webView.postMessage({
					data: {
						text:text
					}
				})
				if(this.voiceData.length>1){
					this.onDone(this.voiceData[1],typeName);
				}else{
					this.onDone(this.voiceData[0],typeName);
				}
			},
			// 播放完执行
			onDone(data,typeName){
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
						this.voiceQueue(typeName)
					}else{
						setTimeout(() => {
							this.repeatRequest(typeName);
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

