<template>
	<view class="content" @longpress="open" @click="open">
		<image class="bg" src="/static/journal.png" ></image>
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
			<view class="info-patient" v-for="(item, index) in data" :key="index" :class="{patientCenter:index>1&&index<=6, patientBottom:index>6}">
				<view >{{ item }}</view>
			</view>
			<view class="remark">
				<text>
					{{remarks}}
				</text>
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" iTypeText="病区号" @close="close" :dataInit="dataPopup"  :showIType="true" ></popupSet>
	</view>
</template>

<script>
import popupSet from '../../components/popup-set/popup-set.vue';
import X2JS from '../../common/xml2json.js';

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
			weekday: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
			data: {
				0:'',
				1:'',
				2:'',
				3:'',
				4:'',
				5:'',
				6:'',
				7:'',
				8:'',
				9:'',
				10:'',
				11:'',
				12:'',
				13:'',
				14:'',
			},
			cliniqueCode: '',
			iType: '',
			popupShow: false,
			seqNumber: '',
			screenNumber: '',
			playSound:false,
			voiceDataInit:[],
			voiceData:[],
			remarks:'',
			test: '测试',
			testNubmer: 0,
			dataPopup:{
				title:'',
				iType:'',
				screenNumber:'',
				playSound:false,
			},
			windowHeight:0,
			reload:false,
		};
	},
	onLoad() {
		//输出结果
		this.iType = uni.getStorageSync('iType') || '';
		this.newDate();
		let _this = this;
		uni.getSystemInfo({
		    success: function (res) {
				_this.windowHeight = res.windowHeight;
		    }
		});
		if (this.iType ) {
			this.init();
			this.dataPopup.iType = this.iType;
			this.dataPopup.screenNumber = this.screenNumber;
			this.dataPopup.playSound = this.playSound;
		}
	},
	methods: {
		//当前时间
		newDate(dataTime=new Date()) {
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
			if (this.iType ) {
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
			// let res = {data:{"reload":"false","Data":"<record><column  name=\"count_no\" value=\"14\"><dept><deptName>急诊科(病区)</deptName><bedNum>11</bedNum></dept><dept><deptName>肛肠一科(病区)</deptName><bedNum>3</bedNum></dept></column><column  name=\"today_in\" value=\"\"><dept><deptName>急诊科(病区)</deptName><bedNum>13</bedNum></dept></column><column  name=\"today_out\" value=\"\"><dept><deptName>急诊科(病区)</deptName><bedNum>6</bedNum></dept></column><column  name=\"mov_bed\" value=\"\"><dept><deptName></deptName><bedNum> 5迁10</bedNum></dept></column><column  name=\"count_critical\" value=\"\"><dept><deptName>急诊科(病区)</deptName><bedNum>4、1、2</bedNum></dept></column><column  name=\"count_in_out\" value=\"\"><dept><deptName>急诊科(病区)</deptName><bedNum>4、10、1、2</bedNum></dept></column><column  name=\"count_bedsore\" value=\"\"><dept><deptName>急诊科(病区)</deptName><bedNum>19、8、2、4</bedNum></dept></column><column  name=\"custody\" value=\"\"><dept><deptName>急诊科(病区)</deptName><bedNum>4、2、7、10、1</bedNum></dept></column><column  name=\"count_falling\" value=\"\"><dept><deptName></deptName><bedNum>1、2、4、5、7、8</bedNum></dept></column><column  name=\"remarks\" value=\"\"><dept><deptName></deptName><bedNum>总值班护士长：张琼\n值班医生：王榕\n</bedNum></dept></column><column  name=\"division\" value=\"\"><dept><deptName></deptName><bedNum></bedNum></dept></column><column  name=\"chemotherapy\" value=\"\"></column><column  name=\"tomorrow_chemotherapy\" value=\"\"></column><column  name=\"pipeLine\" value=\"\"><dept><deptName>急诊科(病区)</deptName><bedNum>4、2、7、8、1</bedNum></dept></column></record>","ServerTime":"2021-02-22 16:43:47"}}
			
			uni.request({
				url: 'http://129.1.20.21:8019/Queue/getQueryNursingDate',
				// url: 'http://192.168.0.164:8019/Queue/getQueryNursingDate',
				data: {
					dqh000: this.iType,
					types:'1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30',
				},
				method:'GET',
				success: res => {
					setTimeout(()=>{
						this.init();
					},10000)
					this.newDate(res.data.ServerTime);
					if(!res.data.Data){
						return;
					}
					let data = res.data.Data;
					if(res.data.reload=='true' && this.reload!=res.data.reload){
						this.$tui.webView.postMessage({
							data: {
								reload:res.data.reload
							}
						})
					}
					this.reload = res.data.reload;
					let x2js = new X2JS();
					let jsonObj = x2js.xml_str2json(res.data.Data);
					this.data = {
						0:'', 
						1:'',
						2:'',
						3:'',
						4:'',
						5:'',
						6:'',
						7:'',
						8:'',
						9:'',
						10:'',
						11:'',
						12:'',
						13:'',
						14:'',
					}
					if(jsonObj.record.column.length==0){
						return;
					}
					jsonObj.record.column.forEach((item,index)=>{
						let bedNum = '';
						try{
							bedNum = (item.dept.bedNum||'');
						}catch(e){
							bedNum = '';
						}
						console.log(item);
						switch(item._name) {
							case 'count_no':
								let total = 0;
								let text = [];
								if(item.dept instanceof Array){
									item.dept.forEach((dept)=>{
										text.push(dept.deptName + dept.bedNum);
										total += +dept.bedNum
									})
								}else{
									text.push(item.dept.deptName + item.dept.bedNum)
									total += +item.dept.bedNum
								}
								this.data[0] ='总数：'+total+'：'+text.join("，");
								break;
							case 'today_in':
								this.data[1] = this.itemArray(item).join("，");
								break;
							case 'mov_in':
							   this.data[2] = this.itemArray(item).join("，");
								break;
							case 'today_out':
							   this.data[3] = this.itemArray(item).join("，");
								break;
							case 'mov_out':
							   this.data[4] = this.itemArray(item).join("，");
								break;
							case 'tomorrow_out':
							   this.data[5] = this.itemArray(item).join("，");
								break;
							case 'mov_room':
							   this.data[6] = this.itemArray(item).join("，");
								break;
							case 'count_OPS':
							   this.data[7] = bedNum
								break;
							case 'count_bedsore':
							   this.data[8] = bedNum
								break;
							case 'mov_bed':
							   this.data[9] = bedNum
								break;
							case 'count_falling':
							   this.data[10] = bedNum
								break;
							case 'blood_sugar':
							   this.data[11] = bedNum
								break;
							case 'count_pee':
							   this.data[12] = bedNum
								break;
							case 'count_critical':
							   this.data[13] = bedNum
								break;
							case 'count_in_out':
							   this.data[14] = bedNum
								break;
							case 'remarks':
							   this.remarks = bedNum
								break;
						} 
					})
				},
				fail: res => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
					console.log(res);
					setTimeout(()=>{
						this.init();
					},10000)
				}
			});
		},
		itemArray(item){
			let text = [];
			if(item.dept instanceof Array){
				item.dept.forEach((dept)=>{
					text.push(dept.deptName + dept.bedNum);
				})
			}else{
				text.push((item.dept.deptName||'') + (item.dept.bedNum || '')) ;
			}
			return text;
		}
		
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
	height: 1080px;
}
.header {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 145px;
}

.content {
	position: relative;
	height: 1080px;
	overflow: hidden;
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
	right: 100px;
}
.header-title {
	color: rgb(253, 250, 7);
	font-size: 32px;
	font-weight: 800;
	letter-spacing: 12px;
}
.header-time view {
	font-size: 32px;
	color: #000;
	letter-spacing: 5px;
}
.info {
	
	padding-left: 40px;
	padding-right: 40px;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	box-sizing: border-box;
}
.remark{
	position: absolute;
	top: 395px;
	width: 405px;
	height: 646px;
	overflow: hidden;
	font-size: 36px;
	right: 40px;
	font-weight: bold;
}
.info-patient {
	height: 82px;
	line-height: 82px;
	margin-left: 150px;
	width: 1687px;
	overflow: hidden;
}
.info-patient.patientCenter{
	width: 1274px;
}
.info-patient.patientBottom{
	width: 564px;
}
.name {
    width: 468px;
    margin-left: 274px;
}
.info-patient view {
	color: #333333;
	font-size: 35px;
	font-weight: bold;
}

</style>
