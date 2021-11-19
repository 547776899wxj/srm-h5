<template>
	<view>
		<view class="content"  @longpress="open" @click="open">
			<image class="bg" src="/static/nosethroatOne.png" ></image>
			<view class="header">
				<view class="header-time">
					<view class="pr-15">
						<text>{{ dateText.year }}年{{ dateText.month }}月{{ dateText.date }}日</text>
					</view>
					<view >
						<text>{{dateText.day}} {{ dateText.time }}</text>
					</view>
				</view>
			</view>
			<view class="data">
				<view class="data-item" v-for="(item,index) in data" :key="index">
					<view class="title">
						{{item.cliniqueName}}
					</view>
					<view class="data-details">
						<view class="seeing">
							<view class="details-title">
								正在就诊：
							</view>
							<view class="details-content">
								<text class="pr-30" v-show="item.callingSeq">{{item.callingSeq}}号</text>
								<text>{{item.calling}}</text>
							</view>
						</view>
						<!-- <view class="waiting">
							<view class="details-title">
								等待就诊：
							</view>
							<view class="details-content">
								<text class="pr-30" v-show="item.waitingSeq">{{item.waitingSeq}}号</text>
								<text>{{item.waiting}}</text>
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<view class="footer">
				感谢您的耐心等候！
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" iTypeText="诊室" @close="close" :dataInit="dataPopup" :showPlaySound="true"></popupSet>
	</view>
</template>

<script>
	import popupSet from '../../components/popup-set/popup-set.vue';
	export default {
		components: { popupSet },
		data() {
			return {
				iType:'',
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
				},
				data:[],
				voiceData:[],
				voiceDataInit:[],
				voicePlayTiems:3,
				voicePlayNumber:0,
				testNumber:0,
				audioList:[],
				playSound:false,
			};
		},
		onLoad() {
			this.dataPopup.playSound = uni.getStorageSync("playSound") || false;
			this.playSound = this.dataPopup.playSound;
			this.init();
		},
		methods:{
			// 打开设置
			open(){
				this.$refs.popupSet.open();
				this.popupShow = true;
			},
			// 关闭设置
			close(){
				this.popupShow = false;
			},
			//确定设置
			confirm(res) {
				this.playSound = res.playSound;
				this.popupShow = false;
			},
			init(){
				// let res = {data:{"reload":"false",
				// "audioList":[
				// {"isReCall":0,"deptCode":"2199","deptName":"耳鼻喉科","cliniqueName":"内镜一","cliniqueCode":"5","techTitle":null,"doctor":null,"doctorPic":null,"introduction":null,"calling":"eee1","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:52","waiting":"eee","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:52","amPm":'下午',"status":null},
				// {"isReCall":0,"deptCode":"2199","deptName":"耳鼻喉科","cliniqueName":"纤维鼻咽喉镜室","cliniqueCode":"1","techTitle":null,"doctor":null,"doctorPic":null,"introduction":null,"calling":"tt1","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:42","waiting":"tt","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:42","amPm":'下午',"status":null},
				// {"isReCall":0,"deptCode":"2199","deptName":"耳鼻喉科","cliniqueName":"内镜一","cliniqueCode":"5","techTitle":null,"doctor":null,"doctorPic":null,"introduction":null,"calling":"eee2","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:52","waiting":"eee","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:52","amPm":'下午',"status":null},
				// {"isReCall":0,"deptCode":"2199","deptName":"耳鼻喉科","cliniqueName":"纤维鼻咽喉镜室","cliniqueCode":"1","techTitle":null,"doctor":null,"doctorPic":null,"introduction":null,"calling":"tt2","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:42","waiting":"tt","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:42","amPm":'下午',"status":null}
				// ],
				// "Data":[
				// {"isReCall":0,"deptCode":"2199","deptName":"耳鼻喉科","cliniqueName":"内镜一","cliniqueCode":"5","techTitle":null,"doctor":null,"doctorPic":null,"introduction":null,"calling":"eee","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:52","waiting":"eee","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:52","amPm":'下午',"status":null},
				// {"isReCall":0,"deptCode":"2199","deptName":"耳鼻喉科","cliniqueName":"纤维鼻咽喉镜室","cliniqueCode":"1","techTitle":null,"doctor":null,"doctorPic":null,"introduction":null,"calling":"tt","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:42","waiting":"tt","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:42","amPm":'下午',"status":null}
				// ],
				// "ServerTime":"2021-01-15 13:00:07"},
				// }
				// res.data.audioList[0].isReCall = this.testNumber++;
				//测试----------------------------------------------------------------------------------------------------------------------------------------
				
				uni.request({	
					url: 'http://129.1.20.21:8019/Queue/getNosethroat',
					method: 'POST',
					success: res => {
						try{
							let datas = res.data;
							this.dateText = this.geteDateText(datas.ServerTime);
							if(datas.reload=='true' || datas.reload==true){
								location.reload();
								return;
							}
							let dataMaps = [];
							let dataAudioList = [];
							let voiceDataInit = [];
							datas.Data = datas.Data.slice(0,1);
							datas.Data.forEach(item =>{
								let calling =item.calling?this.$util.hideName(item.calling):'';
								let waiting =item.waiting?this.$util.hideName(item.waiting):'';
								let isRecall = false;
								if(item.isReCall > 0){
									this.data.forEach((oldItem,index) =>{
										if(oldItem.callingSeq == item.callingSeq && item.isReCall > oldItem.isisReCallNumber){
											isRecall = true;
										}
									})
								}
								dataMaps = dataMaps.concat({
									cliniqueName: item.cliniqueName || '',
									calling: calling,
									callingSeq: item.callingSeq || '',
									waiting: waiting,
									waitingSeq: item.waitingSeq || '',
									isRecall: isRecall,
									isisReCallNumber:item.isReCall,
								});
								if(item.calling && this.playSound){
									let number = this.$util.chineseNumeral(item.callingSeq+'');
									let speakText = `请,${number},${item.calling},到${item.cliniqueName}就诊`;
									if(this.data.length==0){
										this.voiceData.push(speakText);
										this.voiceDataInit.push(speakText);
									}else{
										voiceDataInit = voiceDataInit.concat(speakText);
									}
								}
							})
							if(voiceDataInit.length>0){
								this.voiceData = this.$util.findDifferentElements(voiceDataInit,this.voiceDataInit);
								dataMaps.forEach((item, index) => {
									if(item.isRecall){
										this.voiceData.unshift(voiceDataInit[index])
									}
								})
								this.voiceDataInit = voiceDataInit;
							}
							this.data = dataMaps;
							
							if(this.voiceData.length>0){
								this.voiceQueue();	
							}else{
								setTimeout(() => {
									this.init()
								}, 6000);
							}
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.init();
							}, 6000);
						}
						
					},
					fail: (err) => {
						setTimeout(() => {
							this.init();
						}, 6000);
					},
				});
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
							this.init()
						}, 6000);
					}
				}, date);
				
			},
		}
	}
</script>

<style lang="scss">
.content{
	width: 768px;
	height: 1366px;
}
.pr-30{
	padding-right: 30px;
}
.footer{
	font-size: 22px;
	padding: 10px 60px;
	font-weight: bold;
}
.data{
	height: 1172px;
	.data-item{
		height: 586px;
		.title{
			font-weight: bold;
			font-size: 53px;
			line-height: 90px;
			padding-bottom: 10px;
			text-align: center;
		}
		.data-details{
			padding: 30px 60px;
			color: #FFFFFF;
			font-size: 52px;
			.seeing{
				padding-bottom: 30px;
			}
			.details-content{
				line-height: 2;
				text-align: center;
			}
		}
		
	}
}
.bg {
	width: 768px;
	height: 1366px;
	position: absolute;
	z-index: -1;
}
.header{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 145px;
	.header-time {
		position: absolute;
		right: 45px;
		padding-top: 15px;
	}
	.header-time view {
		font-size: 30px;
		color: #000;
	}
}
</style>
