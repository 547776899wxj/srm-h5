<template>
	<view>
		<view class="content"  @longpress="open" @click="open">
			<image class="bg" src="/static/fuke_bg.png" ></image>
			<view class="header">
				妇科肿瘤专病门诊
			</view>
			<view class="doctor">
				<view class="doctor-top">
					<image class="doctor-img" src="../../static/test.jpeg" mode=""></image>
					<view class="title">
						<view class="doctor-name">林庄儿</view>
						<view class="doctor-title">副主任医师</view>
					</view>
				</view>
				<view class="doctor-info">
					<view class="">擅长：我把这心思去跟一位擅长丹青的同志商量,求她画。我把这心思去跟一位擅长丹青的同志商量,求她画。</view>
					<view class="">坐诊时间：周一、二、三、四</view>
				</view>
			</view>
			<view class="data">
				<view class="data-item">
					<text style="margin-right: 50px;">47号</text>
					<text>吴先杰</text>
				</view>
				<view class="data-item">
					<text style="margin-right: 50px;">47号</text>
					<text>吴先杰</text>
				</view>
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" iTypeText="诊室" @close="close" :dataInit="dataPopup"></popupSet>
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
				data:{},
				voiceData:[],
				voiceDataInit:[],
				voicePlayTiems:3,
				voicePlayNumber:0,
				testNumber:0,
			};
		},
		onLoad() {
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
				this.iType = res.iType;
				this.screenNumber = res.screenNumber;
				this.popupShow = false;
				
			},
			init(){
				
				let res = {data:{"reload":"false",
					"Data":[
					{"deptCode":"2199","deptName":"耳鼻喉耳鼻","cliniqueName":"内镜一","cliniqueCode":"5","techTitle":null,"doctor":"吴先杰","doctorPic":"吴先杰","introduction":null,"calling":"eee","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:52","waiting":"eee","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:52","amPm":"下午","status":null},
				
					{"deptCode":"2199","deptName":"耳鼻喉耳鼻喉科科","cliniqueName":"纤维鼻咽喉镜室","cliniqueCode":"1","techTitle":null,"doctor":"吴先杰","doctorPic":"吴先杰","introduction":null,"calling":"tt","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:42","waiting":"tt","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:42","amPm":"下午","status":null}
					],
					"ServerTime":"2021-01-15 13:00:07"}
				}
				this.data = res.Data[0];
				//测试----------------------------------------------------------------------------------------------------------------------------------------
				
				// uni.request({	
				// 	url: 'http://129.1.20.21:8019/Queue/getNosethroat',
				// 	method: 'POST',
				// 	success: res => {
				// 		try{
				// 			let datas = res.data;
				// 			if(datas.reload=='true' || datas.reload==true){
				// 				this.$tui.webView.postMessage({
				// 					data: {
				// 						reload:datas.reload
				// 					}
				// 				})
				// 				return;
				// 			}
				// 			let dataMaps = [];
				// 			let dataAudioList = [];
				// 			let voiceDataInit = [];
				// 			datas.Data.forEach(item =>{
				// 				let calling =item.calling?this.$util.hideName(item.calling):'';
				// 				let waiting =item.waiting?this.$util.hideName(item.waiting):'';
				// 				dataMaps = dataMaps.concat({
				// 					cliniqueName: item.cliniqueName || '',
				// 					calling: calling,
				// 					callingSeq: item.callingSeq || '',
				// 					waiting: waiting,
				// 					waitingSeq: item.waitingSeq || '',
				// 				});
								
				// 			})
				// 			console.log(datas);
				// 			// 语音
				// 			datas.audioList.forEach(item =>{
				// 				let isRecall = false;
				// 				if(item.isReCall > 0){
				// 					this.audioList.forEach((oldItem,index) =>{
				// 						if(oldItem.callingSeq == item.callingSeq && item.isReCall > oldItem.isisReCallNumber){
				// 							isRecall = true;
				// 						}
				// 					})
				// 				}
				// 				if(item.callingSeq){
				// 					dataAudioList = dataAudioList.concat({
				// 						callingSeq: item.callingSeq || '',
				// 						isRecall: isRecall,
				// 						isisReCallNumber:item.isReCall,
				// 					});
				// 					let number = this.$util.chineseNumeral(item.calling+'');
				// 					let speakText = `请,${item.callingSeq},${item.calling},到${item.cliniqueName}就诊`;
				// 					if(this.audioList.length==0){
				// 						this.voiceData.push(speakText);
				// 						this.voiceDataInit.push(speakText);
				// 					}else{
				// 						voiceDataInit = voiceDataInit.concat(speakText);
				// 					}
				// 				}
				// 			})
				// 			if(voiceDataInit.length>0){
				// 				this.voiceData = this.$util.findDifferentElements(voiceDataInit,this.voiceDataInit);
				// 				dataAudioList.forEach((item, index) => {
				// 					if(item.isRecall){
				// 						this.voiceData.unshift(voiceDataInit[index])
				// 					}
				// 				})
				// 				this.voiceDataInit = voiceDataInit;
				// 			}
				// 			this.data = dataMaps;
				// 			this.audioList = dataAudioList;
				// 			if(this.voiceData.length>0){
				// 				this.voiceQueue();	
				// 			}else{
				// 				setTimeout(() => {
				// 					this.init()
				// 				}, 6000);
				// 			}
				// 		}catch(e){
				// 			console.error(e);
				// 			setTimeout(() => {
				// 				this.init();
				// 			}, 6000);
				// 		}
						
				// 	},
				// 	fail: (err) => {
				// 		setTimeout(() => {
				// 			this.init();
				// 		}, 6000);
				// 	},
				// });
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
.data{
	.data-item{
		margin-top: 100px;
		font-size: 70px;
		height: 170px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.doctor{
	height: 530px;
	overflow: hidden;
	padding: 20px 60px;
	.doctor-top{
		display: flex;
		.doctor-img{
			width: 196px;
			height: 284px;
			margin-left: 32px;
		}
		.title{
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 414px;
		}
		.doctor-name{
			margin-top: 40px;
			margin-bottom: 30px;
			font-size: 70px;
		}
		.doctor-title{
			font-size: 45px;
		}
		
	}
	.doctor-info{
		text-indent: 50px;
		font-size: 22px;
		letter-spacing: 3px;
		line-height: 1.5;
		margin-top: 15px;
	}
}
.content{
	width: 768px;
	height: 1366px;
	font-family: KaiTi;
	font-weight: bold;
}
.pr-30{
	padding-right: 30px;
}
.bg {
	width: 768px;
	height: 1366px;
	position: absolute;
	z-index: -1;
}
.header{
	text-align: center;
    color: #fbf803;
    font-size: 65px;
    height: 185px;
    line-height: 185px;
	font-weight: bold;
}
</style>
